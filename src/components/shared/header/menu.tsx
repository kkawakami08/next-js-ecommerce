import React from "react";
import ModeToggle from "./mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { EllipsisVertical, ShoppingCart, User } from "lucide-react";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      {/* desktop menu */}
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button asChild variant={"ghost"}>
          <Link href={"/cart"}>
            <ShoppingCart className="" />
            Cart
          </Link>
        </Button>
        <Button asChild>
          <Link href={"/sign-in"}>
            <User className="" />
            Sign In
          </Link>
        </Button>
      </nav>
      {/* mobile menu */}
      <nav className="md:hidden ">
        <Sheet>
          <SheetTrigger className="align-middle hover:cursor-pointer">
            <EllipsisVertical />
          </SheetTrigger>

          <SheetContent className="flex flex-col items-start p-5">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Button asChild variant={"ghost"}>
              <Link href={"/cart"}>
                <ShoppingCart className="" />
                Cart
              </Link>
            </Button>
            <Button asChild>
              <Link href={"/sign-in"}>
                <User className="" />
                Sign In
              </Link>
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
