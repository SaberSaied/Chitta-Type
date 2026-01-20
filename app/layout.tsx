import type { Metadata } from "next";
import "@/app/globals.css";
import { Navbar } from "@/components";

export const metadata: Metadata = {
  title: "Typing Speed Test",
  description: "Test your typing speed and accuracy with this simple app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
