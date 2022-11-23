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
        <p>sign in</p>
        <Link href="/create">
          <button> Create a New Bookmark</button>
        </Link>
      </Layout>
    );
  } else {
    Router.push("/app");
  }
}
