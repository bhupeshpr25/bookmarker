import Link from "next/link";
import { useEffect, useState } from "react";
import BookmarkCard from "../components/BookmarkCard";
import { Layout } from "../components/Layout";
import { useSession } from "../utils/hooks/useSession";
import { supabase } from "../utils/supabaseClient";

export default function App({}) {
  const session = useSession();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    const user = supabase.auth.user();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user?.id);

      if (error) throw error;
      setBookmarks(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) {
    return (
      <div className="text-lg text-center mt-32 text-gray-700 font-semibold">
        Fetching Bookmarks...
      </div>
    );
  }
  return (
    <Layout session={session}>
      <div>
        {bookmarks?.length === 0 ? (
          <div className="text-center mt-32 text-gray-300">
            <p className="text-xl">You have no bookmarks yet</p>
            <Link href="/create">
              <button className="text-cyan-600 mt-2 font-semibold">
                Create a New Bookmark
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="">
              <p className="text-gray-200 text-xl font-bold text-center">
                My Bookmarks
              </p>
              <Link href="/create">
                <button className="text-gray-100 font-semibold bg-cyan-600 p-2 ml-4 rounded-md">
                  Create
                </button>
              </Link>
            </div>
            <BookmarkCard data={bookmarks} />
          </div>
        )}
      </div>
    </Layout>
  );
}
