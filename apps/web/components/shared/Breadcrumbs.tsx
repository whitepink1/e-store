"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((item) => item !== "");

  return (
    <nav className="items-center hidden gap-2 py-10 text-sm lg:flex">
      <Link href="/" className="text-base font-medium text-gray-400 hover:text-black/80 transition-colors">
        Home
      </Link>
      
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <div key={href} className="flex items-center gap-2">
            <Image src='/icon/arrow-right.png' height={16} width={16} alt="arrow-right"/>
            {isLast ? (
              <span className="text-base font-medium text-black capitalize">
                {segment.replace(/-/g, " ")}
              </span>
            ) : (
              <Link 
                href={href} 
                className="text-base font-medium text-gray-400 hover:text-black/80 transition-colors capitalize"
              >
                {segment.replace(/-/g, " ")}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};