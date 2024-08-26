import ClientNavbar from "./clientNavbar/ClientNavbar";
import ServerNavbar from "./serverNavbar/ServerNavbar";
import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
  navbarStyle: string;
}
export default function Navbar({ children, navbarStyle }: NavbarProps) {
  return (
    <>
      <ClientNavbar navbarStyle={navbarStyle}>
        <ServerNavbar />
      </ClientNavbar>
      {children}
    </>
  );
}
