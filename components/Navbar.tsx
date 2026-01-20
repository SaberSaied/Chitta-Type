"use client";
import Image from "next/image";
import BigLogo from "@/public/assets/images/logo-large.svg";
import SmallLogo from "@/public/assets/images/logo-small.svg";
import Score from "@/public/assets/images/icon-personal-best.svg";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-8 mb-4">
      <div className="logo">
        <Image src={BigLogo} alt="Logo" className="md:block hidden" />
        <Image src={SmallLogo} alt="Logo" className="md:hidden sm:block" />
      </div>
      <div className="flex items-center gap-2">
        <Image src={Score} alt="Score" />
        <span className="text-[#fff5]"> Personal Best:</span> {`0 WPM`}
      </div>
    </nav>
  );
};

export default Navbar;
