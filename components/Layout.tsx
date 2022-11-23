import { AuthSession } from "@supabase/supabase-js";
import Head from "next/head";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Menu } from "./Menu";

export interface Props {
  session: AuthSession | null;
}

export function Layout({ session, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Head>
        <title>bookmarker</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-700">
        <header className="p-4 bg-gray-800 flex justify-between">
          <Link href="/">
            <h1 className="text-cyan-500 font-bold ml-4 cursor-pointer">
              bookmarker
            </h1>
          </Link>
          <Menu session={session} />
        </header>
        <main className="flex-1 p-4">{children}</main>
        <footer className="bg-gray-800 text-center text-gray-600 p-4">
          Made with VS Code &amp; Internet
        </footer>
      </div>
    </>
  );
}
