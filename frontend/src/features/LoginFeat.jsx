import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/apiAxios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";
const LoginFeat = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const [ErrorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/v1/users/login", data);
      dispatch(getUser(res.data.user));
      navigate("/notes");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "login failed");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-900 via-blue-900 to-sky-900 px-4 mt-16"
    >
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
        {ErrorMessage && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {ErrorMessage}
          </p>
        )}

        <h1 className="font-bold text-4xl text-center text-white mb-8">
          Sign In
        </h1>

        <div className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-white text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Your Email"
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
            <label htmlFor="password" className="block text-white text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password"
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
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-sky-400 to-blue-500 py-3 font-semibold text-white hover:scale-[1.02] hover:shadow-lg transition duration-300 cursor-pointer"
          >
            Sign In
          </button>

          <div className="text-center text-white text-sm space-y-2 mt-4">
            <p>
              If you don’t have an account?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
                className="font-semibold text-sky-300 hover:text-sky-200 cursor-pointer transition"
              >
                Sign up
              </span>
            </p>
            <p
              className="font-medium text-sky-300 hover:text-sky-200 cursor-pointer transition"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password?
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginFeat;
