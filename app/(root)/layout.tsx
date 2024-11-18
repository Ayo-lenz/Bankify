// this is to create the dashboard layout with the side bar
// as the sidebar appears only inside the dashboard

import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * again we want to fetch the loggedIn information from the logged in user  section
  instead of the static data we hardcoded at the start
   */

  
  const loggedIn = await getLoggedInUser(); 
  
  // {firstName:'Ayolenz', lastName:'AJS'};

  if(!loggedIn) redirect('/sign-in')
  
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn}/>

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
            src='/icons/logo.svg'
            width={30}
            height={30}
            alt='logo'
          />
          <div>
            <MobileNav user={loggedIn}/>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}