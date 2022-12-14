import { BsBookmarkPlusFill } from "react-icons/bs";
import Link from "next/link";
import { useEffect, useState } from "react";
import BookmarkCard from "../components/BookmarkCard";
import { Layout } from "../components/Layout";
import { useSession } from "../utils/hooks/useSession";
import { supabase } from "../utils/supabaseClient";

export default function App({}) {
  const session = useSession();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
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
      alert("could not fetch bookmarks");
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

  const handleDelete = async (id: string) => {
    try {
      const user = supabase.auth.user();

      const { data, error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);
      fetchBookmarks();
      alert("Bookmark deleted successfully");
    } catch (error) {
      alert("could not delete bookmark");
    }
  };

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
            <div className="flex justify-between">
              <div className="text-right">
                <Link href="/create">
                  <button className="flex items-center justify-center space-x-2 text-gray-100 font-semibold bg-cyan-600 p-2 mx-4 rounded-md">
                    <BsBookmarkPlusFill />
                    <p>add</p>
                  </button>
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-gray-200 text-xl font-bold">
                  My Bookmarks
                </div>
              </div>
              <div></div>
            </div>
            <BookmarkCard data={bookmarks} handleDelete={handleDelete} />
          </div>
        )}
      </div>
    </Layout>
  );
}
