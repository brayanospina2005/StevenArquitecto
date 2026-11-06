export type EffectName = "glass" | "frost" | "ripple" | "plasma" | "timeshift" | "wave" | "slash" | "dissolve";

export const SLIDER_CONFIG = {
  settings: {
    transitionDuration: 2.5,
    autoSlideSpeed: 5000,
    currentEffect: "glass" as EffectName,
    currentEffectPreset: "Default",
    globalIntensity: 1.0,
    speedMultiplier: 1.0,
    distortionStrength: 1.0,
    colorEnhancement: 1.0,
    glassRefractionStrength: 1.0,
    glassChromaticAberration: 1.0,
    glassBubbleClarity: 1.0,
    glassEdgeGlow: 1.0,
    glassLiquidFlow: 1.0,
    frostIntensity: 1.5,
    frostCrystalSize: 1.0,
    frostIceCoverage: 1.0,
    frostTemperature: 1.0,
    frostTexture: 1.0,
    rippleFrequency: 25.0,
    rippleAmplitude: 0.08,
    rippleWaveSpeed: 1.0,
    rippleRippleCount: 1.0,
    rippleDecay: 1.0,
    plasmaIntensity: 1.2,
    plasmaSpeed: 0.8,
    plasmaEnergyIntensity: 0.4,
    plasmaContrastBoost: 0.3,
    plasmaTurbulence: 1.0,
    timeshiftDistortion: 1.6,
    timeshiftBlur: 1.5,
    timeshiftFlow: 1.4,
    timeshiftChromatic: 1.5,
    timeshiftTurbulence: 1.4,
    // Wave
    waveFrequency: 6.0,
    waveAmplitude: 0.08,
    waveAngle: 30.0,
    waveSharpness: 1.0,
    waveGlow: 1.0,
    // Slash
    slashCount: 6.0,
    slashAngle: 45.0,
    slashSharpness: 1.0,
    slashGlow: 1.0,
    slashSpeed: 1.0,
    // Dissolve
    dissolvePixelSize: 12.0,
    dissolveEdge: 1.0,
    dissolvePattern: 1.0,
    dissolveGlow: 1.0,
    dissolveFlow: 1.0,
  },
  effectPresets: {
    glass: {
      Subtle: { glassRefractionStrength: 0.6, glassChromaticAberration: 0.5, glassBubbleClarity: 1.3, glassEdgeGlow: 0.7, glassLiquidFlow: 0.8 },
      Default: { glassRefractionStrength: 1.0, glassChromaticAberration: 1.0, glassBubbleClarity: 1.0, glassEdgeGlow: 1.0, glassLiquidFlow: 1.0 },
      Crystal: { glassRefractionStrength: 1.5, glassChromaticAberration: 1.8, glassBubbleClarity: 0.7, glassEdgeGlow: 1.4, glassLiquidFlow: 0.5 },
      Liquid: { glassRefractionStrength: 0.8, glassChromaticAberration: 0.4, glassBubbleClarity: 1.2, glassEdgeGlow: 0.8, glassLiquidFlow: 1.8 },
    },
    frost: {
      Light: { frostIntensity: 0.8, frostCrystalSize: 1.3, frostIceCoverage: 0.6, frostTemperature: 0.7, frostTexture: 0.8 },
      Default: { frostIntensity: 1.5, frostCrystalSize: 1.0, frostIceCoverage: 1.0, frostTemperature: 1.0, frostTexture: 1.0 },
      Heavy: { frostIntensity: 2.2, frostCrystalSize: 0.7, frostIceCoverage: 1.4, frostTemperature: 1.5, frostTexture: 1.3 },
      Arctic: { frostIntensity: 2.8, frostCrystalSize: 0.5, frostIceCoverage: 1.8, frostTemperature: 2.0, frostTexture: 1.6 },
    },
    ripple: {
      Gentle: { rippleFrequency: 15.0, rippleAmplitude: 0.05, rippleWaveSpeed: 0.7, rippleRippleCount: 0.8, rippleDecay: 1.2 },
      Default: { rippleFrequency: 25.0, rippleAmplitude: 0.08, rippleWaveSpeed: 1.0, rippleRippleCount: 1.0, rippleDecay: 1.0 },
      Strong: { rippleFrequency: 35.0, rippleAmplitude: 0.12, rippleWaveSpeed: 1.4, rippleRippleCount: 1.3, rippleDecay: 0.8 },
      Tsunami: { rippleFrequency: 45.0, rippleAmplitude: 0.18, rippleWaveSpeed: 1.8, rippleRippleCount: 1.6, rippleDecay: 0.6 },
    },
    plasma: {
      Calm: { plasmaIntensity: 0.8, plasmaSpeed: 0.5, plasmaEnergyIntensity: 0.2, plasmaContrastBoost: 0.1, plasmaTurbulence: 0.6 },
      Default: { plasmaIntensity: 1.2, plasmaSpeed: 0.8, plasmaEnergyIntensity: 0.4, plasmaContrastBoost: 0.3, plasmaTurbulence: 1.0 },
      Storm: { plasmaIntensity: 1.8, plasmaSpeed: 1.3, plasmaEnergyIntensity: 0.7, plasmaContrastBoost: 0.5, plasmaTurbulence: 1.5 },
      Nuclear: { plasmaIntensity: 2.5, plasmaSpeed: 1.8, plasmaEnergyIntensity: 1.0, plasmaContrastBoost: 0.8, plasmaTurbulence: 2.0 },
    },
    timeshift: {
      Subtle: { timeshiftDistortion: 0.5, timeshiftBlur: 0.6, timeshiftFlow: 0.5, timeshiftChromatic: 0.4, timeshiftTurbulence: 0.6 },
      Default: { timeshiftDistortion: 1.6, timeshiftBlur: 1.5, timeshiftFlow: 1.4, timeshiftChromatic: 1.5, timeshiftTurbulence: 1.4 },
      Intense: { timeshiftDistortion: 2.2, timeshiftBlur: 2.0, timeshiftFlow: 2.0, timeshiftChromatic: 2.2, timeshiftTurbulence: 2.0 },
      Dreamlike: { timeshiftDistortion: 2.8, timeshiftBlur: 2.5, timeshiftFlow: 2.5, timeshiftChromatic: 2.6, timeshiftTurbulence: 2.5 },
    },
    wave: {
      Breeze: { waveFrequency: 3.0, waveAmplitude: 0.04, waveAngle: 15.0, waveSharpness: 1.8, waveGlow: 0.6 },
      Default: { waveFrequency: 6.0, waveAmplitude: 0.08, waveAngle: 30.0, waveSharpness: 1.0, waveGlow: 1.0 },
      Storm: { waveFrequency: 10.0, waveAmplitude: 0.14, waveAngle: 50.0, waveSharpness: 0.7, waveGlow: 1.5 },
      Tsunami: { waveFrequency: 18.0, waveAmplitude: 0.22, waveAngle: 70.0, waveSharpness: 0.4, waveGlow: 2.0 },
    },
    slash: {
      Gentle: { slashCount: 3.0, slashAngle: 30.0, slashSharpness: 0.6, slashGlow: 0.6, slashSpeed: 0.8 },
      Default: { slashCount: 6.0, slashAngle: 45.0, slashSharpness: 1.0, slashGlow: 1.0, slashSpeed: 1.0 },
      Sharp: { slashCount: 10.0, slashAngle: 60.0, slashSharpness: 1.5, slashGlow: 1.4, slashSpeed: 1.3 },
      Blade: { slashCount: 16.0, slashAngle: 75.0, slashSharpness: 2.0, slashGlow: 2.0, slashSpeed: 1.6 },
    },
    dissolve: {
      Dust: { dissolvePixelSize: 3.0, dissolveEdge: 0.6, dissolvePattern: 0.5, dissolveGlow: 0.5, dissolveFlow: 0.5 },
      Default: { dissolvePixelSize: 12.0, dissolveEdge: 1.0, dissolvePattern: 1.0, dissolveGlow: 1.0, dissolveFlow: 1.0 },
      Chunks: { dissolvePixelSize: 28.0, dissolveEdge: 1.3, dissolvePattern: 1.5, dissolveGlow: 1.4, dissolveFlow: 1.3 },
      Digital: { dissolvePixelSize: 48.0, dissolveEdge: 1.8, dissolvePattern: 2.0, dissolveGlow: 2.0, dissolveFlow: 0.3 },
    },
  },
};

export interface SlideData {
  title: string;
  subtitle: string;
  media: string;
  specs: { power: string; acceleration: string; engine: string };
  navLabel: string;
}

export const SLIDES: SlideData[] = [
  {
    title: "PORSCHE",
    subtitle: "911 GT3 RS",
    media: "/image/porshe/porshe911-1920px.webp",
    specs: { power: "525 HP", acceleration: "0-100: 3.2s", engine: "4.0L Flat-6" },
    navLabel: "Porsche",
  },
  {
    title: "McLAREN",
    subtitle: "750S",
    media: "/image/mclaren/mclaren-1920px.webp",
    specs: { power: "750 HP", acceleration: "0-100: 2.8s", engine: "4.0L Twin-Turbo V8" },
    navLabel: "McLaren",
  },
  {
    title: "ASTON MARTIN",
    subtitle: "DB12",
    media: "/image/aston-martin/astonMartin-1920px.webp",
    specs: { power: "680 HP", acceleration: "0-100: 3.5s", engine: "4.0L Twin-Turbo V8" },
    navLabel: "Aston Martin",
  },
  {
    title: "BENTLEY",
    subtitle: "Continental GT",
    media: "/image/bentley/bentley-1920px.webp",
    specs: { power: "659 HP", acceleration: "0-100: 3.5s", engine: "6.0L W12 Twin-Turbo" },
    navLabel: "Bentley",
  },
  {
    title: "BMW",
    subtitle: "M4 Competition",
    media: "/image/bmw/bmwM4-1920px.webp",
    specs: { power: "510 HP", acceleration: "0-100: 3.4s", engine: "3.0L Twin-Turbo I6" },
    navLabel: "BMW M4",
  },
  {
    title: "PAGANI",
    subtitle: "Huayra R",
    media: "/image/paganni/paganni-1920px.webp",
    specs: { power: "850 HP", acceleration: "0-100: 2.4s", engine: "6.0L V12 N/A" },
    navLabel: "Pagani",
  },
];

export const EFFECT_INDEX: Record<EffectName, number> = {
  glass: 0,
  frost: 1,
  ripple: 2,
  plasma: 3,
  timeshift: 4,
  wave: 5,
  slash: 6,
  dissolve: 7,
};
