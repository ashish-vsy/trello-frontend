import React, { useState, useEffect, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import loginimg from "../assets/login_img.png";
import { OauthLogin, LoginAPI } from "../services/api.user";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (sessionStorage.getItem("userid")) {
      navigate("/home");
    }
  }, []);

  const handleCallbackResponse = (response) => {
    OauthLogin({ credential: response.credential }).then((res) => {
      if (res.status) {
        toast.success("Login successful!");
        sessionStorage.setItem("userid", res.data?.userid);
        navigate("/home");
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleLogin = () => {
    const reqbody = {
      email: email,
      password: password,
    };
    LoginAPI(reqbody).then((res) => {
      if (res.status) {
        toast.success("Login successful!");
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("userid", res.data?.[0].userid);
        navigate("/home");
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleNavigate = () => {
    startTransition(() => navigate("/register"));
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{
        background: "linear-gradient(to bottom, #2985ed, #A592E6, #F5A9E1, #FC85C5)",
      }}
    >
      <Toaster />
      <div className="p-5 h-5/6 w-5/6 rounded-xl flex">
        <div className="flex-1 p-8 justify-center flex flex-col text-center text-white">
          <h1 className="font-bold text-3xl mb-4">Welcome to Trello</h1>
          <p className="text-gray-200 mb-8">Sign in to manage your projects and tasks easily!</p>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <FaEnvelope />
              <label className="font-semibold">Email</label>
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <FaLock />
              <label className="font-semibold">Password</label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-1/2  right-4 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition"
          >
            Sign In
          </button>

          <p className="mt-5 text-gray-200">
            Don't have an account?{" "}
            <span onClick={handleNavigate} className="text-white font-bold cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <img src={loginimg} alt="Login Illustration" className="rounded-lg shadow-lg w-3/4" />
        </div>
      </div>
    </div>
  );
}

export default Login;
