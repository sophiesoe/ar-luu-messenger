"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) return onClick();
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `
        group 
        flex 
        w-full 
        justify-center 
        gap-x-3 
       
        p-4
        text-sm
        font-semibold
        leading-6 
      hover:bg-primary-200
            hover:text-primary-50
      `,
        active && "bg-primary-200 text-primary-50"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
