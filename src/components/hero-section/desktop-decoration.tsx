import Image from "next/image";
import React from "react";

export default function DesktopDecoration() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 container hidden md:block">
      <Image
        src={"/hero-card2.svg"}
        alt=""
        width={330}
        height={471}
        className="absolute top-[17%] right-0"
      />
      <Image
        src={"/hero-card1.svg"}
        alt=""
        width={290}
        height={423}
        className="absolute right-[30%] bottom-[9%]"
      />
    </div>
  );
}
