"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function MobileDecoration() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 container md:hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="absolute top-[10%] right-0 aspect-[7/10] w-[200px]"
      >
        <Image src={"/hero-card2.svg"} alt="" fill />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="absolute bottom-[2%] left-[2%] aspect-[7/10] w-[150px]"
      >
        <Image src={"/hero-card1.svg"} alt="" fill />
      </motion.div>
    </div>
  );
}
