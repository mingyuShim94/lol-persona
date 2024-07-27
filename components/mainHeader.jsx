import Link from "next/link";
import { FaGlobe, FaHome } from "react-icons/fa";
import LocaleSwitcher from "./localeSwitcher";
import PagePadding from "./pagePadding";

export default function MainHeader() {
  return (
    <header className=" bg-blue-900 text-white h-[64px]">
      <PagePadding>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold flex items-center hover:text-yellow-400 transition-colors"
          >
            <FaHome className="mr-2" />
            <span>LOL-Persona</span>
          </Link>
          <LocaleSwitcher />
        </div>
      </PagePadding>
    </header>
  );
}
