"use client";
import Image from "next/image";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { useState } from "react";
import axios from "axios";
import { api } from "@/app/utils/helper/responseHelper";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const logoutHandler = async () => {
    await axios
      .get(api.logout)
      .then((res) => {
        if (res.status === 200) {
          router.refresh();
        } else {
          throw new Error("Failed to log out");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const cancelHandler = () => {
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"outline"}>log out</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>logout</SheetTitle>
        </SheetHeader>
        <div className=' flex flex-col items-center'>
          <Image src='/logout.png' alt='logout' width={200} height={200} />
          <p>are sure want to logout</p>
        </div>
        <SheetFooter className='flex flex-col gap-y-2 mt-4'>
          <Button onClick={logoutHandler}>Log out</Button>
          <Button variant='outline' onClick={cancelHandler}>
            Cancel
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
