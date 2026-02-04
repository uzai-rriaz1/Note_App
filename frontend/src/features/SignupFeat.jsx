import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import api from "../api/apiAxios";
const SignupFeat = () => {
  const [ErrorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/v1/users/register", data);
      const notify = () => toast(res.data.message, { type: "success" });
      notify();
      setTimeout(() => navigate("/"), 5500);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "sign up failed");
    }
  };
  return (
    <>
      {" "}
      <div>
        <ToastContainer position="top-right" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-900 via-blue-900 to-sky-900 px-4 mt-16"
      >
        <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl p-8 shadow-2xl border border-white/20">
          {ErrorMessage && (
            <p className="text-red-400 text-sm mb-3 text-center">
              {ErrorMessage}
            </p>
          )}

          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Create Account
          </h1>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-white mb-1 text-sm"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full rounded-xl bg-white/90 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                {...register("username", {
                  required: "Enter Your username",
                })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white mb-1 text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl bg-white/90 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                {...register("email", {
                  required: "Enter Your Email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please Enter a Valid Email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white mb-1 text-sm"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-xl bg-white/90 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                {...register("password", {
                  required: "Enter Your Password",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message:
                      "Enter at least 1 letter, 1 number and min 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              // onClick={notify}
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-sky-400 to-blue-500 py-3 font-semibold text-white hover:scale-[1.02] hover:shadow-lg transition duration-300"
            >
              Sign Up
            </button>

            <p className="text-center text-white text-sm mt-4">
              Already have an account?{" "}
              <span
                className="font-semibold text-sky-300 hover:text-sky-200 cursor-pointer transition"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupFeat;
