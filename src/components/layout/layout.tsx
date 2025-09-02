import React, { PropsWithChildren } from "react";
import Header from "./header";
import Footer from "./footer";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}
