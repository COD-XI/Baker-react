"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CakeIcon, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/create-recipe", label: "Create Recipe" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <CakeIcon className="h-6 w-6 text-pink-600" />
          <span className="font-bold text-xl text-pink-600">
            Bakery Recipes
          </span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-pink-600 ${
                pathname === link.href ? "text-pink-600" : "text-foreground/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="hidden md:inline-flex">
            Log in
          </Button>
          <Button className="hidden md:inline-flex">Sign up</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {links.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={pathname === link.href ? "text-pink-600" : ""}
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem>
                <Link href="/login">Log in</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/signup">Sign up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
