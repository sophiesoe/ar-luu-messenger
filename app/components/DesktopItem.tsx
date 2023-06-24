"use client";

import Link from "next/link";
import clsx from "clsx";

interface DesktopItemProps {
  label: string;
  active?: boolean;
  href: string;
  onClick?: () => void;
  icon: any;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  active,
  href,
  onClick,
  icon: Icon,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
            group 
            flex 
            gap-x-2 
            rounded-md 
            p-3 
            text-sm 
            font-semibold 
            leading-6 
            transition-all 
            duration-300
            hover:bg-primary-200
            hover:text-primary-50
          
          `,
          active && "bg-primary-200 text-primary-50"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
