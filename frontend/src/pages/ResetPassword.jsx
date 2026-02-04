import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/apiAxios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [ErrorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post(`/v1/users/reset-password/${id}/${token}`, data);
      const notify = () =>
        toast("Password Updated Successfully", { type: "success" });
      notify();
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "login failed");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-900 via-blue-900 to-sky-900 px-4"
    >
      <div>
        <ToastContainer position="top-right" />
      </div>
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
        {ErrorMessage && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {ErrorMessage}
          </p>
        )}

        <h1 className="font-bold text-4xl text-center text-sky-300 mb-8">
          Reset Password
        </h1>

        <div className="space-y-5">
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
            className="w-full rounded-xl bg-linear-to-r from-sky-400 to-blue-500 py-3 font-semibold text-white hover:scale-[1.02] hover:shadow-lg transition duration-300"
          >
            Reset Password
          </button>
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
