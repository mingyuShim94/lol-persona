"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { FaGlobe } from "react-icons/fa";

const LocaleSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectLocale = (e) => {
    const locale = e.target.value;
    startTransition(() => {
      router.replace(`/${locale}`);
    });
  };

  return (
    <div className="relative inline-block">
      <select
        defaultValue={localActive}
        onChange={onSelectLocale}
        disabled={isPending}
        className="appearance-none bg-blue-800 text-white border border-blue-600 rounded-md py-2 pl-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
      >
        <option value="en">English</option>
        <option value="kr">한국어</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <FaGlobe className="h-4 w-4" />
      </div>
    </div>
  );
};

export default LocaleSwitcher;
