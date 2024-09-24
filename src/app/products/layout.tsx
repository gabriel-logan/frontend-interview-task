import type { Metadata } from "next";

import HeaderProducts from "@/components/HeaderProducts";

export const metadata: Metadata = {
  title: "Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderProducts />
      {children}
    </>
  );
}
