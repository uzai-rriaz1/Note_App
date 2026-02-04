import React from "react";

const Home = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-linear-to-br from-indigo-900 via-blue-900 to-sky-900 px-6 pt-24 pb-16 mt-10">
        <div className="max-w-5xl mx-auto text-center mb-16 ">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 ">
            Capture Your Ideas, Anytime
          </h1>
          <p className="text-sky-200 text-lg max-w-3xl mx-auto">
            A modern and secure note-taking app designed to help you organize
            your thoughts, tasks, and ideas in one simple place.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg shadow-black/10 hover:scale-110 transition duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">
              Simple & Clean
            </h2>
            <p className="text-sky-200 text-sm leading-relaxed ">
              A distraction-free interface with a modern glassmorphism design
              that helps you focus on what matters most your notes.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg shadow-black/10 hover:scale-110 transition duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">
              Secure by Design
            </h2>
            <p className="text-sky-200 text-sm leading-relaxed">
              Your notes are protected using secure authentication and
              authorization mechanisms, ensuring privacy and data safety.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg shadow-black/10 hover:scale-110 transition duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">
              Accessible Anywhere
            </h2>
            <p className="text-sky-200 text-sm leading-relaxed">
              Fully responsive design that works seamlessly across mobile,
              tablet, and desktop devices.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-white/60 text-sm">
            Start organizing your thoughts today with our modern Note App.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
