import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { createClient,repositoryName } from "@/prismicio";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      
      <body className={clsx(urbanist.className,"relative min-h-screen")}>
      <Header></Header>
        {children}
        <Footer></Footer>

        <div className="absolute inset-0 -z-50 max-h-screen background-gradient" ></div>
        <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
        {/* <div className="h-[500vh]"></div> */}
        </body>
        <PrismicPreview repositoryName={repositoryName}></PrismicPreview>
    </html>
  );
}
