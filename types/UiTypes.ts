import { Session } from "next-auth";
import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  pendingLabel?: string;
  variant?: "primary" | "secondary" | "link";
  size?: "sm" | "md" | "lg";
};

export type NavItem = {
  label: string;
  href?: string;
};

export type NavigationListProps = {
  navItems: NavItem[];
  className?: string;
  classNameLi?: string;
  onItemClick?: () => void;
};

export type MobileMenuProps = {
  session: Session | null;
  navOptions: NavItem[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalRef: React.RefObject<HTMLDivElement | null>;
};
