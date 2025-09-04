"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number | null;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenIndex = null,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const [heights, setHeights] = useState<{ [key: number]: number }>({});
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const newHeights: { [key: number]: number } = {};
    items.forEach((_, index) => {
      if (contentRefs.current[index]) {
        newHeights[index] = contentRefs.current[index]!.scrollHeight;
      }
    });
    setHeights(newHeights);
  }, [items]);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border-b-2 border-black pb-4 md:pb-6">
          <button
            className="flex w-full cursor-pointer items-center justify-between text-left"
            onClick={() => toggleItem(index)}
          >
            <h3 className="text-xl leading-normal font-medium text-[#050505] md:text-3xl">
              {item.title}
            </h3>
            <motion.span
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#050505"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </button>

          <motion.div
            initial={false}
            animate={{
              height: openIndex === index ? heights[index] || 0 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            className="overflow-hidden"
          >
            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              className="font-manrope pt-4 text-base leading-none font-medium text-[#868686] md:pt-6 md:text-xl"
            >
              {item.content}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
