'use client';

import Image from "next/image";
import refreshIcon from "@/public/assets/images/icon-restart.svg";
import { useRouter } from "next/navigation";

const Restart = ({ setRestart }: { setRestart: (value: boolean) => void }) => {
  const router = useRouter();

  const handleRestart = () => {
    setRestart(true);
    router.refresh();
  }
  setRestart(false);

  return (
    <button
      className="flex items-center text-center m-auto gap-2 px-4 py-2 bg-[#fff1] hover:bg-blue-700 rounded-md text-white font-medium cursor-pointer"
      onClick={() => handleRestart()}
      onKeyDown={e => e.preventDefault()} 
    >
      <Image src={refreshIcon} alt="Refresh" /> Restart Test
    </button>
  );
};

export default Restart;
