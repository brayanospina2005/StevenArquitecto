"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

export default function FaqList() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      {faqs.map((f, i) => {
        const open = openFaq === i;
        return (
          <div key={f.q} className="border-t border-[#cec5b8]">
            <button onClick={() => setOpenFaq(open ? -1 : i)} className="w-full flex items-center justify-between gap-6 py-6 text-left" aria-expanded={open}>
              <span className="text-[19px] md:text-[21px] font-light">{f.q}</span>
              <span className={`text-[24px] font-light shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className="grid transition-all duration-500" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="text-[15px] leading-relaxed text-[#4b3b31] max-w-[620px] pb-7">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
