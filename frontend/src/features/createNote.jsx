import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/apiAxios";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";

const CreateNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const onSubmit = async () => {
    try {
      const res = await api.post("/v1/notes/createnote", { title, content });

      const notify = () => toast(`${res.data.message}`, { type: "success" });
      notify();
      setTimeout(() => navigate("/notes"), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24 bg-linear-to-br from-indigo-900 via-blue-900 to-sky-900 mt-10">
        <div className="w-full max-w-5xl rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">
          <h1 className="font-bold text-4xl text-center text-sky-300 mb-10">
            Create Your Note
          </h1>

          <div className="flex flex-col items-center justify-center mb-8">
            <input
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              type="text"
              required
              placeholder="Enter Your Note Title"
              className="w-full  rounded-xl bg-white/90 px-5 py-4 text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            />
          </div>
          <div className="rounded-xl overflow-hidden border border-white/20 shadow-xl">
            <Editor
              id="editor"
              onEditorChange={(content) => {
                setContent(content);
              }}
              apiKey="7z7y1t6df72wco34hvpwervk6gnzqadxtubivwbxmw4yjzf3"
              initialValue="<p>Enter Your Content.</p>"
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "preview",
                  "help",
                  "wordcount",
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
              onClick={onSubmit}
              className="text-white bg-linear-to-r from-green-400 to-green-600 p-3 rounded-2xl cursor-pointer hover:scale-110 transition duration-300 shadow-green-500 shadow-md"
            >
              Save
            </button>
            <button
              onClick={() => navigate("/")}
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

export default CreateNote;
