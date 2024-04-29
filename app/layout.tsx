import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { crush } from "obiflix";
import Header from "@/components/Header";
crush.setName("fifteen");

const pop = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "komorei",
  icons:
    "https://s4.anilist.co/file/anilistcdn/user/avatar/large/b6726615-thB9VtblIdpC.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={pop.className}
        style={{
          WebkitTextSizeAdjust: "none",
          backgroundColor: "black",
          fontSize: "1rem",
          WebkitFontSmoothing: "antialiased",
        }}>
        {children}
      </body>
    </html>
  );
}
