import React from "react";

const Pageloader = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center
                    bg-linear-to-br from-indigo-900 via-blue-900 to-sky-900"
    >
      <div
        className="h-12 w-12 animate-spin rounded-full
                      border-4 border-white/30 border-t-sky-400"
      ></div>
    </div>
  );
};

export default Pageloader;
