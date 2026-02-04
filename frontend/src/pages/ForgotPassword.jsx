import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/apiAxios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const ForgotPassword = () => {
  const [ErrorMessage, setErrorMessage] = useState("");

  const [sendingmail, setSendingmail] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/v1/users/forgot-password", data);

      setTimeout(() => navigate("/"), 3000);
      const notify = () => toast("Mail Sended", { type: "success" });
      notify();
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
          Forgot Password
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

          {/* Button */}
          {sendingmail ? (
            <button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-sky-400 to-blue-500 py-3 font-semibold text-white hover:scale-[1.02] hover:shadow-lg transition duration-300"
            >
              Sending....
            </button>
          ) : (
            <button
              onClick={() => setSendingmail(true)}
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-sky-400 to-blue-500 py-3 font-semibold text-white hover:scale-[1.02] hover:shadow-lg transition duration-300"
            >
              Send Mail
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
