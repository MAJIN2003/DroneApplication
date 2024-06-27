"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuProps {
  items: Item[];
}

interface Item {
  name: string;
  url: string;
}

const Menu = ({ items }: MenuProps) => {
  const path = usePathname();

  return (
    <nav>
      <ul className="flex gap-6 text-white">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              className={clsx("py-2 px-10 rounded-md hover:border hover:border-spacing-0.5 hover:border-white transition-all duration-200", {
                "border border-spacing-0.5 border-white": path === item.url,
              })}
              href={item.url}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
