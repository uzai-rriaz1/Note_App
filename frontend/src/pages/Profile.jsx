import { useState } from "react";
import { Mail, User, Lock, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";

export default function Profile() {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-indigo-900 via-blue-900 to-sky-900 flex items-center justify-center px-4 mt-14">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-sky-300 text-sm mt-1">
            Manage your account settings
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-linear-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            N/A
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <User className="text-sky-300" size={20} />
            <span className="text-white text-sm">{user.username}</span>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <Mail className="text-sky-300" size={20} />
            <span className="text-white text-sm">{user.email}</span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate("/forgot-password")}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 py-3 text-white cursor-pointer font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            <Lock size={18} />
            Forgot Password
          </button>

          <button
            onClick={() => dispatch(logoutUser())}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 py-3 text-white hover:bg-white/20 transition cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
