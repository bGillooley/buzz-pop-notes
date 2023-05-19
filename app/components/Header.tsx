"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <div className="fixed flex w-full justify-between p-4">
      <div className="font-semibold text-xl">Smedley Attack!</div>
      <div>
        {session && <button onClick={() => signOut()}>Log out</button>}
        {!session && <button onClick={() => signIn()}>Log in</button>}
      </div>
    </div>
  );
}
