import { AuthSession } from "@supabase/supabase-js";
import Link from "next/link";
import Router from "next/router";
import { supabase } from "../utils/supabaseClient";

export interface Props {
  session: AuthSession | null;
}

export function Menu({ session }: Props) {
  return (
    <ul className="flex">
      {session ? (
        <>
          <li className="flex">
            <button
              className="text-cyan-600 mr-6"
              onClick={() => {
                supabase.auth.signOut();
                Router.push("/");
              }}
            >
              sign out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/signin">
              <a className="text-cyan-600">Sign in with magic link</a>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
