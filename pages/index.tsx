import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { useSession } from "../utils/hooks/useSession";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const session = useSession();

  if (!session) {
    return (
      <Layout session={session}>
        <div className="text-center">
          <Link href="/signin">
            <button className="text-gray-300 mt-32 font-semibold text-xl hover:underline">
              {" "}
              Sign in to create a bookmarks
            </button>
          </Link>
        </div>
      </Layout>
    );
  } else {
    Router.push("/app");
  }
}
