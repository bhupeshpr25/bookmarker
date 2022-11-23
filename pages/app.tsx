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
    return <div>Fetching Bookmarks...</div>;
  }
  return (
    <Layout session={session}>
      <div>
        {bookmarks?.length === 0 ? (
          <div>
            <p>You have no bookmarks yet</p>
            <Link href="/create">
              <button>Create a New Bookmark</button>
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-gray-200 text-xl font-bold flex items-center justify-center">
              My Bookmarks
            </p>
            <BookmarkCard data={bookmarks} />
          </div>
        )}
      </div>
    </Layout>
  );
}
