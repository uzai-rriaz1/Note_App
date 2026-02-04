import React, { useEffect, useState } from "react";
import api from "../api/apiAxios";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";

const Updatenote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/v1/notes/note/${id}`);
        setTitle(res.data.data.title);
        setContent(res.data.data.content);
      } catch (error) {
        console.error("Failed to fetch note:", error);
        toast.error("Failed to load note");
        navigate("/notes");
      }
    };
    fetchNote();
  }, [id, navigate]);

  const onUpdate = async () => {
    try {
      const res = await api.put(`/v1/notes/updatenote/${id}`, {
        title,
        content,
      });
      toast.success(res.data.message || "Note updated successfully");
      setTimeout(() => navigate("/notes"), 2000);
    } catch (error) {
      console.error("Failed to update note:", error);
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24 bg-linear-to-br from-indigo-900 via-blue-900 to-sky-900 mt-10">
        <div className="w-full max-w-5xl rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">
          <h1 className="font-bold text-4xl text-center text-sky-300 mb-10">
            Update Your Note
          </h1>

          <div className="flex flex-col items-center justify-center mb-8">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              type="text"
              required
              placeholder="Enter Your Note Title"
              className="w-full rounded-xl bg-white/90 px-5 py-4 text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            />
          </div>

          <div className="rounded-xl overflow-hidden border border-white/20 shadow-xl">
            <Editor
              value={content}
              onEditorChange={(updatedContent) => setContent(updatedContent)}
              apiKey="7z7y1t6df72wco34hvpwervk6gnzqadxtubivwbxmw4yjzf3"
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table preview help wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>

          <div className="flex flex-row-reverse gap-6 mt-3">
            <button
              onClick={onUpdate}
              className="text-white bg-linear-to-r from-green-400 to-green-600 p-3 rounded-2xl cursor-pointer hover:scale-110 transition duration-300 shadow-green-500 shadow-md"
            >
              Update
            </button>
            <button
              onClick={() => navigate("/notes")}
              className="text-white bg-linear-to-r from-red-400 to-rose-600 p-3 rounded-2xl cursor-pointer hover:scale-110 transition duration-300 shadow-md shadow-rose-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Updatenote;
