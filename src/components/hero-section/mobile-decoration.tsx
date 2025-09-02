import Image from "next/image";
import React from "react";

export default function MobileDecoration() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 container md:hidden">
      <div className="absolute top-[10%] right-0 aspect-[7/10] w-[200px]">
        <Image src={"/hero-card2.svg"} alt="" fill />
      </div>
      <div className="absolute bottom-[2%] left-[2%] aspect-[7/10] w-[150px]">
        <Image src={"/hero-card1.svg"} alt="" fill />
      </div>
    </div>
  );
}
