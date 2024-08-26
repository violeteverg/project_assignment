"use client";

import { useEffect, useState, ReactNode } from "react";
import Style from "./ClientNavbar.module.css";

interface ClientNavbarProps {
  navbarStyle?: string;
  children?: ReactNode;
}

export default function ClientNavbar({
  navbarStyle,
  children,
}: ClientNavbarProps) {
  const [visible, setVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  // when user scrolling down navbar will like hidden
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      setVisible(currentPosition <= 80);
      setScrollPosition(currentPosition);

      clearTimeout(timeout);
      timeout = setTimeout(() => setVisible(true), 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div
      className={`bg-transparent ${
        visible ? Style.fadeIn : Style.fadeOut
      } ${navbarStyle} z-50 top-0 inset-x-0 h-[80px] ${
        scrollPosition > 80 ? Style.blurredBackground : ""
      }`}
    >
      {children}
    </div>
  );
}
