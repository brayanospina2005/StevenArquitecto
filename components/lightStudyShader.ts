export const LIGHT_VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}`;
export const LIGHT_FRAG = `precision highp float;
uniform vec2 uRes;
uniform float uSketch;
uniform float uSolid;
uniform float uMat;
uniform float uSun;
uniform float uGlow;
uniform float uCam;
uniform float uShift;
uniform float uShiftY;
uniform float uZoom;
uniform vec3 uBg;
uniform vec3 uGroundCol;
uniform vec3 uConcrete;
uniform vec3 uShade;
uniform vec3 uSunCol;
uniform vec3 uGlowCol;
uniform vec3 uTimber;
uniform vec3 uGlass;
uniform vec3 uWater;
uniform vec3 uLeaf;
uniform vec3 uInk;

float sdBox(vec3 p, vec3 b){ vec3 q = abs(p)-b; return length(max(q,0.0))+min(max(q.x,max(q.y,q.z)),0.0); }
float sdEll(vec3 p, vec3 r){ float k0 = length(p/r); float k1 = length(p/(r*r)); return k0*(k0-1.0)/k1; }
// small near the edges of a box surface, large elsewhere
float boxEdge(vec3 p, vec3 b){ vec3 q = abs(p)-b; float a = max(q.x,max(q.y,q.z)); float c = min(q.x,min(q.y,q.z)); float mid = q.x+q.y+q.z-a-c; return max(abs(a), abs(mid)); }
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float vnoise(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), f.x), mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), f.x), f.y); }
float fbm(vec2 p){ return 0.55*vnoise(p)+0.3*vnoise(p*2.03+7.1)+0.15*vnoise(p*4.11+3.7); }

float gB;
// m: 1 plaster, 2 concrete, 3 timber, 4 glass, 5 water, 6 leaves, 7 frame
float building(vec3 p, out float m, out float e){
  m = 2.0; e = 1.0;
  float bb = sdBox(p-vec3(0.0, 0.6, 0.25), vec3(2.95, 0.75, 1.95));
  if(bb > 0.25){ return bb; }
  float d = 1e3;
  float pt = 0.08;
  // terrace plinth with pool cut
  vec3 pp = p-vec3(0.0, pt*0.5, 0.15);
  vec3 pc = p-vec3(1.0, pt, 1.05);
  float pl = max(sdBox(pp, vec3(2.3, pt*0.5, 1.45)), -sdBox(pc, vec3(0.95, 0.03, 0.27)));
  if(pl < d){ d = pl; m = 2.0; e = min(boxEdge(pp, vec3(2.3, pt*0.5, 1.45)), boxEdge(pc, vec3(0.95,0.03,0.27))); }
  // steps
  vec3 s1 = p-vec3(-0.95, 0.054, 1.66); float st1 = sdBox(s1, vec3(0.34, 0.027, 0.06));
  if(st1 < d){ d = st1; m = 2.0; e = boxEdge(s1, vec3(0.34,0.027,0.06)); }
  vec3 s2 = p-vec3(-0.95, 0.027, 1.78); float st2 = sdBox(s2, vec3(0.34, 0.027, 0.06));
  if(st2 < d){ d = st2; m = 2.0; e = boxEdge(s2, vec3(0.34,0.027,0.06)); }
  // pool water and coping
  vec3 pw = p-vec3(1.0, pt-0.024, 1.05); float water = sdBox(pw, vec3(0.95, 0.004, 0.27));
  if(water < d){ d = water; m = 5.0; e = 1.0; }
  vec3 cp = p-vec3(1.0, pt+0.006, 1.05);
  float cop = max(sdBox(cp, vec3(1.0, 0.006, 0.32)), -sdBox(cp, vec3(0.95, 0.02, 0.27)));
  if(cop < d){ d = cop; m = 2.0; e = min(boxEdge(cp, vec3(1.0,0.006,0.32)), boxEdge(cp, vec3(0.95,0.02,0.27))); }
  // timber deck in front of the glass
  vec3 dk = p-vec3(-0.3, pt+0.008, 0.62); float deck = sdBox(dk, vec3(1.24, 0.008, 0.16));
  if(deck < d){ d = deck; m = 3.0; e = boxEdge(dk, vec3(1.24,0.008,0.16)); }
  // glass ground floor
  vec3 gp = p-vec3(-0.3, pt+0.28, -0.05); float gv = sdBox(gp, vec3(1.24, 0.28, 0.5));
  if(gv < d){ d = gv; m = 4.0; e = boxEdge(gp, vec3(1.24,0.28,0.5)); }
  // mullions on the front
  vec3 mp = p-vec3(-0.3, pt+0.28, 0.455);
  float ms = 0.31; float mk = clamp(floor(mp.x/ms+0.5), -4.0, 4.0); mp.x -= mk*ms;
  float mul = sdBox(mp, vec3(0.011, 0.28, 0.012));
  if(mul < d){ d = mul; m = 7.0; e = boxEdge(mp, vec3(0.011,0.28,0.012)); }
  // end walls
  vec3 e1p = p-vec3(-1.58, pt+0.28, -0.05); float ew1 = sdBox(e1p, vec3(0.045, 0.28, 0.6));
  if(ew1 < d){ d = ew1; m = 2.0; e = boxEdge(e1p, vec3(0.045,0.28,0.6)); }
  vec3 e2p = p-vec3(0.98, pt+0.28, -0.05); float ew2 = sdBox(e2p, vec3(0.045, 0.28, 0.6));
  if(ew2 < d){ d = ew2; m = 2.0; e = boxEdge(e2p, vec3(0.045,0.28,0.6)); }
  // ground floor roof slab
  vec3 rp = p-vec3(-0.3, pt+0.59, -0.05); float rs = sdBox(rp, vec3(1.42, 0.03, 0.66));
  if(rs < d){ d = rs; m = 2.0; e = boxEdge(rp, vec3(1.42,0.03,0.66)); }
  // upper volume with window strip, side slot, fins and roof cap
  vec3 up = p-vec3(0.5, pt+0.62+0.27, -0.3);
  vec3 rc1 = up-vec3(0.05, -0.01, 0.45);
  vec3 rc2 = up-vec3(1.0, 0.0, 0.0);
  float ub = sdBox(up, vec3(1.0, 0.27, 0.45));
  ub = max(ub, -sdBox(rc1, vec3(0.86, 0.16, 0.08)));
  ub = max(ub, -sdBox(rc2, vec3(0.08, 0.19, 0.17)));
  if(ub < d){ d = ub; m = 1.0; e = min(boxEdge(up, vec3(1.0,0.27,0.45)), min(boxEdge(rc1, vec3(0.86,0.16,0.08)), boxEdge(rc2, vec3(0.08,0.19,0.17)))); }
  vec3 g1 = up-vec3(0.05, -0.01, 0.39); float gl1 = sdBox(g1, vec3(0.86, 0.16, 0.006));
  if(gl1 < d){ d = gl1; m = 4.0; e = boxEdge(g1, vec3(0.86,0.16,0.006)); }
  vec3 g2 = up-vec3(0.95, 0.0, 0.0); float gl2 = sdBox(g2, vec3(0.006, 0.19, 0.17));
  if(gl2 < d){ d = gl2; m = 4.0; e = boxEdge(g2, vec3(0.006,0.19,0.17)); }
  vec3 f = up-vec3(0.05, -0.01, 0.47);
  float fs = 0.082; float fk = clamp(floor(f.x/fs+0.5), -10.0, 10.0); f.x -= fk*fs;
  float fin = sdBox(f, vec3(0.011, 0.175, 0.022));
  if(fin < d){ d = fin; m = 3.0; e = boxEdge(f, vec3(0.011,0.175,0.022)); }
  vec3 cap = up-vec3(0.0, 0.285, 0.0); float cp2 = sdBox(cap, vec3(1.03, 0.014, 0.48));
  if(cp2 < d){ d = cp2; m = 2.0; e = boxEdge(cap, vec3(1.03,0.014,0.48)); }
  // sun loungers
  vec3 l1 = p-vec3(-0.32, pt+0.035, 1.12); float lo1 = sdBox(l1, vec3(0.09, 0.02, 0.2));
  if(lo1 < d){ d = lo1; m = 3.0; e = boxEdge(l1, vec3(0.09,0.02,0.2)); }
  vec3 l2 = p-vec3(-0.06, pt+0.035, 1.12); float lo2 = sdBox(l2, vec3(0.09, 0.02, 0.2));
  if(lo2 < d){ d = lo2; m = 3.0; e = boxEdge(l2, vec3(0.09,0.02,0.2)); }
  // planter with hedge
  vec3 plt = p-vec3(-1.95, pt+0.06, -0.75); float pla = sdBox(plt, vec3(0.28, 0.06, 0.14));
  if(pla < d){ d = pla; m = 2.0; e = boxEdge(plt, vec3(0.28,0.06,0.14)); }
  float hedge = sdEll(p-vec3(-1.95, pt+0.15, -0.75), vec3(0.27, 0.07, 0.13));
  if(hedge < d){ d = hedge; m = 6.0; e = 1.0; }
  // trees
  vec3 tp = p-vec3(-1.9, pt, 0.95);
  float tr = sdBox(tp-vec3(0.0, 0.32, 0.0), vec3(0.02, 0.32, 0.02));
  if(tr < d){ d = tr; m = 3.0; e = 1.0; }
  float br = sdBox(tp-vec3(0.1, 0.62, 0.04), vec3(0.11, 0.012, 0.012));
  if(br < d){ d = br; m = 3.0; e = 1.0; }
  float c = sdEll(tp-vec3(0.0, 0.82, 0.0), vec3(0.44,0.16,0.4));
  c = min(c, sdEll(tp-vec3(0.27, 0.72, 0.12), vec3(0.3,0.12,0.26)));
  c = min(c, sdEll(tp-vec3(-0.25, 0.74, -0.1), vec3(0.28,0.12,0.26)));
  c = min(c, sdEll(tp-vec3(0.05, 0.92, -0.18), vec3(0.24,0.1,0.22)));
  c = min(c, sdEll(tp-vec3(-0.1, 0.68, 0.24), vec3(0.22,0.09,0.2)));
  c += 0.022*sin(tp.x*38.0)*sin(tp.z*41.0)*sin(tp.y*35.0) + 0.01*sin(tp.x*91.0+tp.y*77.0)*sin(tp.z*83.0);
  if(c < d){ d = c; m = 6.0; e = 1.0; }
  vec3 tq = p-vec3(1.95, pt, -0.85);
  float tr2 = sdBox(tq-vec3(0.0, 0.2, 0.0), vec3(0.016, 0.2, 0.016));
  if(tr2 < d){ d = tr2; m = 3.0; e = 1.0; }
  float c2 = sdEll(tq-vec3(0.0, 0.5, 0.0), vec3(0.24,0.16,0.24));
  c2 = min(c2, sdEll(tq-vec3(0.12, 0.42, 0.06), vec3(0.16,0.1,0.16)));
  c2 = min(c2, sdEll(tq-vec3(-0.1, 0.58, -0.08), vec3(0.15,0.09,0.15)));
  c2 += 0.018*sin(tq.x*44.0)*sin(tq.z*39.0)*sin(tq.y*41.0);
  if(c2 < d){ d = c2; m = 6.0; e = 1.0; }
  // third tree, back left, off the plinth
  vec3 tz = p-vec3(-2.5, 0.0, -1.2);
  float tr3 = sdBox(tz-vec3(0.0, 0.3, 0.0), vec3(0.018, 0.3, 0.018));
  if(tr3 < d){ d = tr3; m = 3.0; e = 1.0; }
  float c3 = sdEll(tz-vec3(0.0, 0.74, 0.0), vec3(0.3,0.2,0.28));
  c3 = min(c3, sdEll(tz-vec3(0.12, 0.62, 0.1), vec3(0.2,0.12,0.18)));
  c3 += 0.02*sin(tz.x*41.0)*sin(tz.z*37.0)*sin(tz.y*43.0);
  if(c3 < d){ d = c3; m = 6.0; e = 1.0; }
  // low shrubs on the lawn in front of the terrace
  vec3 sh = p-vec3(0.0, 0.0, 1.86);
  float shr = sdEll(sh-vec3(0.35, 0.05, 0.0), vec3(0.2, 0.1, 0.12));
  shr = min(shr, sdEll(sh-vec3(0.8, 0.045, 0.03), vec3(0.17, 0.09, 0.11)));
  shr = min(shr, sdEll(sh-vec3(1.3, 0.05, -0.01), vec3(0.22, 0.1, 0.12)));
  shr = min(shr, sdEll(sh-vec3(1.85, 0.04, 0.02), vec3(0.16, 0.08, 0.1)));
  shr += 0.012*sin(p.x*70.0)*sin(p.z*63.0)*sin(p.y*90.0);
  if(shr < d){ d = shr; m = 6.0; e = 1.0; }
  return d;
}

float gMat; float gEdge;
float map(vec3 p){
  float m; float e;
  float b = building(p, m, e);
  gB = b;
  if(b < p.y){ gMat = m; gEdge = e; return b; }
  gMat = 0.0; gEdge = 1.0;
  return p.y;
}

vec3 calcN(vec3 p){
  const vec2 k = vec2(1.0,-1.0); float h = 0.0012;
  return normalize(k.xyy*map(p+k.xyy*h)+k.yyx*map(p+k.yyx*h)+k.yxy*map(p+k.yxy*h)+k.xxx*map(p+k.xxx*h));
}

float softShadow(vec3 ro, vec3 rd){
  float res = 1.0; float t = 0.02; float m; float e;
  for(int i=0;i<48;i++){
    float h = building(ro+rd*t, m, e);
    res = min(res, 9.0*h/t);
    t += clamp(h, 0.012, 0.2);
    if(res < 0.002 || t > 7.0) break;
  }
  return clamp(res, 0.0, 1.0);
}

float calcAO(vec3 p, vec3 n){ float o=0.0, s=1.0; for(int i=1;i<=4;i++){ float h=0.05*float(i); o+=(h-map(p+n*h))*s; s*=0.6; } return clamp(1.0-1.8*o,0.0,1.0); }

float reveal(vec3 p){
  float k = p.x*0.42 + p.y*0.9 - p.z*0.32;
  float front = mix(-1.6, 2.2, uSketch);
  return 1.0-smoothstep(front-0.12, front+0.02, k);
}

void main(){
  vec2 uv = (gl_FragCoord.xy*2.0-uRes)/uRes.y;
  uv.x -= uShift;
  uv.y += uShiftY;
  float ang = mix(0.62, 0.98, uCam);
  float rad = 5.4/uZoom;
  vec3 ro = vec3(sin(ang)*rad, 2.35/uZoom+0.25, cos(ang)*rad);
  vec3 ta = vec3(0.15, 0.48, 0.15);
  vec3 ww = normalize(ta-ro);
  vec3 uu = normalize(cross(ww, vec3(0.0,1.0,0.0)));
  vec3 vv = cross(uu, ww);
  vec3 rd = normalize(uv.x*uu + uv.y*vv + 2.0*ww);
  float px = 2.0/uRes.y;

  float t = 0.3; bool hit = false;
  float minB = 1e3; float minT = 0.0;
  for(int i=0;i<130;i++){
    vec3 q = ro+rd*t;
    float d = map(q);
    if(gB < minB){ minB = gB; minT = t; }
    if(d < 0.0008){ hit = true; break; }
    t += d;
    if(t > 18.0) break;
  }
  vec3 col = uBg;
  float lineA = 0.0;
  if(hit){
    vec3 p = ro+rd*t;
    float mat = gMat;
    float edge = gEdge;
    vec3 n = calcN(p);
    if(mat > 4.5 && mat < 5.5){ n = normalize(n + vec3(0.035*sin(p.x*31.0+p.z*11.0), 0.0, 0.035*sin(p.z*37.0-p.x*9.0))*uMat); }
    float az = mix(-1.15, 1.2, uSun);
    float el = mix(0.85, 0.36, uSun);
    vec3 L = normalize(vec3(cos(el)*sin(az), sin(el), cos(el)*cos(az)));
    vec3 sunC = mix(vec3(1.0,0.98,0.94), uSunCol, smoothstep(0.35,1.0,uSun));
    float dif = clamp(dot(n,L), 0.0, 1.0);
    float sh = (dif > 0.0 && uSolid > 0.001) ? softShadow(p+n*0.004, L) : 1.0;
    float ao = calcAO(p, n);
    float amb = 0.6+0.4*n.y;
    vec3 warm = mix(vec3(1.0), sunC, 0.35*uSun);
    float fre = pow(1.0-clamp(dot(n,-rd),0.0,1.0), 4.0);
    vec3 H = normalize(L-rd);
    vec3 lit;
    if(mat < 0.5){
      float f = smoothstep(1.9, 6.5, length(p.xz));
      float shadowAmt = (1.0-sh)*(1.0-f);
      vec3 g = uBg*mix(vec3(1.0), warm, 0.6);
      g = mix(g, uGroundCol, (1.0-f)*0.35);
      // lawn around the terrace and a stone path from the steps
      vec2 q = p.xz-vec2(0.0, 0.25);
      vec2 dq = abs(q)-vec2(2.85, 2.05);
      float rr = length(max(dq, 0.0))+min(max(dq.x, dq.y), 0.0)-0.35;
      float nz = fbm(p.xz*2.6);
      float lawn = 1.0-smoothstep(-0.02, 0.07, rr+(nz-0.5)*0.16);
      vec3 grass = mix(uLeaf*1.2, uLeaf*0.92, fbm(p.xz*11.0));
      grass = mix(grass, uGroundCol, 0.3)*mix(vec3(1.0), warm, 0.5);
      g = mix(g, grass, lawn*uMat);
      float path = (1.0-smoothstep(0.17, 0.2, abs(p.x+0.95)))*step(1.82, p.z)*(1.0-smoothstep(2.55, 2.9, p.z+(nz-0.5)*0.25));
      path *= step(0.14, fract(p.z*3.3));
      g = mix(g, uConcrete*0.92*mix(vec3(1.0), warm, 0.5), path*uMat);
      g = mix(g, g*mix(vec3(1.0), uShade*2.4, 0.55), shadowAmt*0.55);
      g *= mix(1.0, ao, 1.0-f);
      lit = mix(uBg, g, uSolid);
    } else {
      vec3 model = vec3(0.94, 0.925, 0.9);
      vec3 real = uConcrete;
      if(mat < 1.5) real = uConcrete*vec3(1.02, 1.02, 1.03);
      else if(mat < 2.5) real = uConcrete*0.86*(0.97+0.03*smoothstep(0.3,0.7,fract(p.y*16.0)));
      else if(mat < 3.5) real = uTimber*(0.9+0.1*step(0.5, fract(p.x*22.0)));
      else if(mat < 4.5) real = uGlass;
      else if(mat < 5.5) real = uWater;
      else if(mat < 6.5) real = uLeaf*(0.82+0.18*sin(p.x*40.0)*sin(p.z*37.0)*sin(p.y*43.0));
      else real = uShade*1.5;
      vec3 base = mix(model, real, uMat);
      vec3 shaded = base*(0.62*amb*ao*mix(uBg, vec3(1.0), 0.5) + 0.62*dif*sh*sunC);
      float shadowAmt = (1.0-sh*dif);
      shaded = mix(shaded, shaded*mix(vec3(1.0), uShade*2.2, 0.5), shadowAmt*0.22);
      if(mat > 3.5 && mat < 5.5){
        float refl = mix(0.18, 0.75, fre);
        vec3 sky = mix(uBg*1.08, sunC, 0.25*uSun);
        shaded = mix(shaded, sky, refl*uMat);
        shaded += sunC*pow(clamp(dot(n,H),0.0,1.0), 90.0)*sh*0.8*uMat;
      }
      if(mat > 3.5 && mat < 4.5){
        float room = (0.75+0.25*sin(p.x*7.0+1.3))*(0.86+0.14*smoothstep(0.35, 0.65, fract(p.x*9.0)));
        float floorLift = clamp(1.25-(p.y-0.08)*0.9, 0.7, 1.3);
        shaded = mix(shaded, uGlowCol*1.35*room*floorLift, uGlow*0.85*uMat);
      }
      if(mat > 4.5 && mat < 5.5){
        shaded = mix(shaded, mix(uWater*1.25, sunC*0.95, 0.18), 0.35*uMat*(0.6+0.4*fre));
        shaded = mix(shaded, shaded+uGlowCol*0.25, uGlow*0.5*uMat);
      }
      // paper first, model fills in
      lit = mix(uBg, shaded, uSolid);
      float w = px*t*0.9;
      float ln = 1.0-smoothstep(w*0.5, w*1.3, edge);
      lineA = ln*reveal(p);
    }
    col = mix(lit, uBg, smoothstep(9.0, 17.0, t));
  }
  // outline where the ray passes close to the building (silhouette)
  if(!hit || gMat < 0.5){
    float w = px*minT*1.1;
    float sil = 1.0-smoothstep(w*0.4, w*1.4, minB);
    vec3 pm = ro+rd*minT;
    lineA = max(lineA, sil*reveal(pm));
  }
  float pencil = 0.78+0.22*hash(floor(gl_FragCoord.xy*0.5));
  float lineFade = mix(1.0, 0.12, uSolid)*(1.0-uMat);
  col = mix(col, uInk, lineA*pencil*0.85*lineFade);
  col = mix(col, col*col*(3.0-2.0*col), 0.22*uMat);
  col = pow(col, vec3(0.96));
  gl_FragColor = vec4(col, 1.0);
}`;
