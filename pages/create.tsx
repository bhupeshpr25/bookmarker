import { supabase } from "../utils/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { useSession } from "../utils/hooks/useSession";

const Create = () => {
  const initialState = {
    title: "",
    link: "",
    note: "",
  };

  const router = useRouter();
  const session = useSession();
  const [bookmarkData, setBookmarkData] = useState(initialState);

  const { title, link, note } = bookmarkData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookmarkData({ ...bookmarkData, [e.target.name]: e.target.value });
  };

  const createBookmark = async () => {
    try {
      const user = supabase.auth.user();

      const { data, error } = await supabase
        .from("bookmarks")
        .insert([
          {
            title,
            link,
            note,
            user_id: user?.id,
          },
        ])
        .single();
      if (error) throw error;
      alert("Bookmark created successfully");
      setBookmarkData(initialState);
      router.push("/");
    } catch (error) {
      alert("error");
    }
  };

  return (
    <Layout session={session}>
      <div className="px-4 mx-auto max-w-7xl">
        <div className="w-full px-0 pt-5 pb-6 mx-auto mb-0 space-y-8 bg-transparent border-0 border-gray-600 rounded-lg bg-slate-700 md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5">
          <h1 className="mb-5 text-xl font-semibold text-left text-gray-200 sm:text-center">
            Create Bookmark
          </h1>
          <div className="flex flex-col pb-1 space-y-8">
            <div>
              <label className="block mb-1 font-medium text-gray-300">
                Title
              </label>
              <input
                className="p-2 my-1 w-full rounded-md border-cyan-600 text-gray-900 bg-gray-200 border-1"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-300">
                Link
              </label>
              <input
                className="p-2 my-1 w-full rounded-md border-cyan-600 text-gray-900 bg-gray-200 border-1"
                type="link"
                name="link"
                value={link}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            {/* <div>
              <label className="block mb-1 font-medium text-gray-300">
                Note
              </label>
              <input
                className="p-2 my-1 w-full rounded-md border-cyan-600 text-gray-900 bg-gray-200 border-1"
                type="text"
                name="note"
                value={note}
                onChange={handleChange}
                placeholder=""
              />
            </div> */}
            <button
              className="w-full p-3 rounded-lg text-gray-50 mt-5 bg-cyan-600 sm:w-auto sm:mt-0"
              onClick={createBookmark}
            >
              Create Bookmark
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
