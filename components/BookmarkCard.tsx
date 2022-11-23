import Link from "next/link";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import Microlink from "@microlink/react";
import { useState } from "react";

const BookmarkCard = ({ data }) => {
  const [preview, setPreview] = useState("");
  return (
    <div className="my-10 flex flex-row flex-wrap">
      {data?.map((item) => (
        <div
          key={item.id}
          className="bg-slate-800 w-80 lg:w-96 p-4 m-4 rounded-lg flex"
        >
          <div className="w-24 lg:w-32 h-auto">
            {preview ? (
              <Microlink url="" size="small" />
            ) : (
              <div className="w-md">
                <Microlink url={item.link} media="logo" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="w-full flex justify-between">
              <p className="text-gray-200 flex-wrap line-clamp-2">
                {item.title}
              </p>
            </div>
            <a
              className="text-gray-400 my-3 w-48 lg:w-52 break-words
                line-clamp-2 hover:underline"
              href={item.link}
            >
              {item.link}
            </a>
            {/* </Link> */}
            {/* <p>note - {item.note}</p> */}
            <p className="text-gray-500">
              {formatDistanceToNow(new Date(item.inserted_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkCard;
