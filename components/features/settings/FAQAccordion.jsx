'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question} className={index === items.length - 1 ? '' : 'border-b border-line'}>
            <button type="button" aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)} className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-bronze sm:px-5">
              <span className="text-sm font-semibold text-charcoal">{item.question}</span>
              <ChevronDown size={17} className={`shrink-0 text-graphite-soft transition-transform ${open ? 'rotate-180 text-bronze-deep' : ''}`} />
            </button>
            {open && <p className="px-4 pb-4 text-sm leading-relaxed text-graphite sm:px-5">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
