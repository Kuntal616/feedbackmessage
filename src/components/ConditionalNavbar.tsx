"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar'; // Adjust the import path

const ConditionalNavbar = () => {
  const pathname = usePathname();
  const noNavbarRoutes = ['/sign-in', '/sign-up'];

  if (noNavbarRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar />;
};

export default ConditionalNavbar;