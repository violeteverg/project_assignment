import { Icons } from "@/app/components/Icon";
import WidthWrapper from "@/app/components/WidthWrapper";
import Link from "next/link";
import UserProfile from "../../userProfile/UserProfile";

export default function ServerNavbar() {
  return (
    <header className='relative h-full bg-transparent lg:mx-4 mt-2'>
      <WidthWrapper>
        <div className='flex h-16 items-center'>
          <div className='ml-4 flex lg:ml-0'>
            <Link href='/'>
              <Icons.logo />
            </Link>
          </div>
          <div className='ml-auto flex items-center'>
            <div className=' md:mr-6 lg:flex lg:flex-1 lg:items-center lg:justify-center lg:space-x-6'>
              <UserProfile />
            </div>
          </div>
        </div>
      </WidthWrapper>
    </header>
  );
}
