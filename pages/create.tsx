import { supabase } from "../utils/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/router";

const Create = () => {
  const initialState = {
    title: "",
    link: "",
    note: "",
  };

  const router = useRouter();
  const [bookmarkData, setBookmarkData] = useState(initialState);

  const { title, link, note } = bookmarkData;

  const handleChange = (e) => {
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
      alert(error.message);
    }
  };

  return (
    <>
      <div>
        <div>
          <p>Create a New Bookmark</p>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter a title"
          />
          <label>Link :</label>
          <input
            type="text"
            name="link"
            value={link}
            onChange={handleChange}
            placeholder="Enter link"
          />
          <label>Note :</label>
          <input
            type="text"
            name="note"
            value={note}
            onChange={handleChange}
            placeholder="Enter number of note"
          />

          <button onClick={createBookmark}>Create Bookmark</button>
        </div>
      </div>
    </>
  );
};

export default Create;
