import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { supabase } from "../../utils/supabaseClient";

const Edit = () => {
  const [bookmark, setBookmark] = useState("");
  const router = useRouter();

  const { id } = router.query;
  useEffect(() => {
    const user = supabase.auth.user();
    const getBookmark = async () => {
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user?.id)
        .filter("id", "eq", id)
        .single();
      setBookmark(data);
    };
    getBookmark();
  }, [id]);

  const { title, link, note } = bookmark;

  const handleOnChange = (e) => {
    setBookmark({
      ...bookmark,
      [e.target.name]: e.target.value,
    });
  };

  const updateBookmark = async () => {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("bookmarks")
      .update({
        title,
        link,
        note,
      })
      .eq("id", id)
      .eq("user_id", user?.id);

    alert("bookmark updated successfully");

    router.push("/");
  };

  const deleteBookmark = async (id) => {
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);
      alert("Bookmark deleted successfully");
      //reload
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <div>
        <h1>Edit bookmark</h1>
        <label> Title:</label>
        <input
          type="text"
          name="title"
          value={bookmark.title}
          onChange={handleOnChange}
        />
        <label>Link</label>
        <input
          type="text"
          name="link"
          value={bookmark.link}
          onChange={handleOnChange}
        />
        <label>note</label>
        <input
          type="text"
          name="note"
          value={bookmark.note}
          onChange={handleOnChange}
        />

        <button onClick={updateBookmark}>Update bookmark</button>

        <button onClick={() => deleteBookmark(item.id)}>
          <BsTrash />
          delete
        </button>
      </div>
    </div>
  );
};

export default Edit;
