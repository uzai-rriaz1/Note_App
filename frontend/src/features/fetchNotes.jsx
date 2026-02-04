import React from "react";
import { useEffect } from "react";
import api from "../api/apiAxios";
import { useState } from "react";
import { Trash } from "lucide-react";
import { SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const FetchNotes = () => {
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    const res = await api.get("/v1/notes/notes");
    return res.data.data;
  };

  const handleDelete = async (noteId) => {
    try {
      const res = await api.delete(`/v1/notes/deletenote/${noteId}`);
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
      const notify = toast(`${res.data.message}`, { type: "error" });
      setTimeout(() => notify(), 5500);
      console.log("note deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  // const handleUpdate = async (noteId) => {
  //   try {
  //     const res = await api.get(`/v1/notes/note/${noteId}`);
  //     console.log(res.data.message);
  //     navigate("/updatenote");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const fetchedNotes = async () => {
      try {
        const res = await getNotes();
        if (!res) console.log("there is no response");
        if (res) console.log("there is resposne");

        setNotes(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedNotes();
  }, []);
  return (
    <>
      <div>
        <ToastContainer position="top-right" />
      </div>
      <div className="min-h-screen w-full bg-linear-to-r from-indigo-900 to-blue-900 pt-36 p-8 relative">
        <button
          onClick={() => navigate("/createnote")}
          className="absolute top-24 left-8 flex items-center gap-2 px-5 py-3
                 bg-linear-to-r from-indigo-900 via-blue-800 to-sky-600
                 text-white font-semibold rounded-xl shadow-lg
                 hover:scale-110 transition transform duration-300 z-50 cursor-pointer"
        >
          <SquarePen size={20} />
          Create Note
        </button>
        <h1 className="text-center text-white text-3xl font-bold">My Notes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {notes.map((note) => (
            <div
              key={note._id}
              className="group flex flex-col justify-between h-64 w-full 
               bg-linear-to-r from-indigo-800 to-sky-600 backdrop-blur-xl p-5
               border border-white/20 rounded-2xl
               shadow-lg shadow-black/10
               hover:-translate-y-1 hover:bg-white/15 hover:border-sky-400/40
               transition-all duration-300 cursor-pointer"
            >
              <div>
                <h2 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                  {note.title}
                </h2>

                <p className="text-sm text-sky-200 line-clamp-4">
                  {note.content.replace(/<[^>]+>/g, "")}
                </p>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="absolute bottom-2 right-28 text-white bg-linear-to-r from-red-400 to-rose-600 p-3 rounded-2xl cursor-pointer  transition duration-500 shadow-md shadow-rose-600 scale-0 group-hover:scale-100"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/updatenote/${note._id}`)}
                  className="absolute bottom-2 right-5 text-white bg-linear-to-r from-green-400 to-green-600 p-3 rounded-2xl cursor-pointer transition duration-500 shadow-green-500 shadow-md  scale-0 group-hover:scale-100 "
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FetchNotes;
