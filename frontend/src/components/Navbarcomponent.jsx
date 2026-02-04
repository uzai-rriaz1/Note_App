import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { LogIn } from "lucide-react";
import { LogOut } from "lucide-react";

import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";

const Navbarcomponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const pages = [
    { name: "Profile", id: 1, route: "/profile" },
    { name: "Notes", id: 3, route: "/notes" },
    {
      name: user ? (
        <button
          onClick={() => dispatch(logoutUser())}
          className="flex gap-2 text-white  items-center justify-center bg-linear-to-r from-red-400 to-rose-600 rounded-2xl p-3 border-2 shadow-xl border-white/20 shadow-white/30 bg-blue-500 cursor-pointer  hover:shadow-lg hover:text-sky-300"
        >
          <LogOut />
          Logout
        </button>
      ) : (
        <button className="flex gap-2 text-white  items-center justify-center bg-linear-to-r from-indigo-900 to-sky-900 rounded-2xl p-3 border-2 shadow-xl border-white/20 shadow-white/30 bg-blue-500 cursor-pointer  hover:shadow-lg hover:text-sky-300">
          <LogIn />
          Sign In
        </button>
      ),
      id: 2,
      route: "/login",
    },
    // { name: "Contact Us", id: 3, route: "/contact" },
  ];
  const [isopen, setIsopen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-7 py-5 bg-linear-to-r from-indigo-900/90 via-blue-900/90 to-sky-900/90 backdrop-blur-xl border-b border-white/10">
      <div>
        <h1
          className="font-bold text-3xl text-white tracking-wide hover:text-sky-300 transition cursor-pointer"
          onClick={() => navigate("/")}
        >
          Notify
        </h1>
      </div>

      {/* <div className="max-sm:hidden">
        <ul className="flex space-x-6 text-white">
          {pages.map((e) => (
            <li key={e.id}>
              <NavLink
                to={e.route}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-sky-400 pb-1 text-sky-300 font-semibold transition"
                    : "hover:text-sky-300 transition"
                }
              >
                {e.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div> */}

      <div className="">
        {isopen ? (
          <X
            className="fixed top-3 right-5 cursor-pointer text-white hover:text-sky-300 transition z-50"
            onClick={() => setIsopen(false)}
            size={26}
          />
        ) : (
          <Menu
            onClick={() => setIsopen(true)}
            size={26}
            className="absolute right-5 top-7 cursor-pointer text-white hover:text-sky-300 transition"
          />
        )}
      </div>

      {/* {isopen && (
        <div className="fixed top-16 right-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-10 py-14 shadow-2xl">
          <ul className="flex flex-col space-y-4 text-white text-lg">
            {pages.map((e) => (
              <li key={e.id}>
                <NavLink
                  to={e.route}
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-sky-400 pb-1 text-sky-300 font-semibold"
                      : "hover:text-sky-300 transition"
                  }
                >
                  {e.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <div className={`flex`}>
        <div
          className={`flex flex-col items-end justify-start gap-5 bg-linear-to-r from-indigo-900 via-blue-800 to-sky-600  min-h-screen w-72 absolute z-40 right-0 top-0 pt-16 pr-6  transform transition-transform duration-500 ease-in-out
    ${isopen ? "translate-x-0" : "translate-x-full"}`}
        >
          {pages.map((e) => (
            <ul key={e.id} className=" pr-4">
              <NavLink to={e.route} onClick={() => setIsopen(false)}>
                <li className="p-0 text-white font-bold hover:scale-110 transition duration-300">
                  {e.name}
                </li>
              </NavLink>
            </ul>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbarcomponent;
