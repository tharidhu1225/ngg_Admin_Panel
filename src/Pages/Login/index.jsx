import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // ✅ Remember Me

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoadingLogin(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      const data = res.data;

      if (data.success) {
        if (data.user.role !== "ADMIN") {
          toast.error("Unauthorized: Only admin accounts can login.");
          return;
        }

        // ✅ Store token based on Remember Me
        if (rememberMe) {
          localStorage.setItem("token", data.token); // persists even after closing tab
        } else {
          sessionStorage.setItem("token", data.token); // clears on tab close
        }

        localStorage.setItem("user_role", data.user.role);
        toast.success(data.message || "Login successful!");

        navigate("/"); // go to dashboard
      } else {
        toast.error(data.message || "Login failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error. Please try again.");
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <section className="bg-white w-full h-full">
      <img
        src="/pattern2.jpg"
        className="w-full fixed top-0 left-0 opacity-20"
        alt="background"
      />

      <div className="loginBox card w-[600px] pb-20 mx-auto pt-20 relative z-50">
        <div className="text-center">
          <img src="/logo.jpg" className="m-auto w-[150px]" alt="logo" />
        </div>

        <h1 className="text-center text-[30px] text-[#191919] font-[800] mt-0">
          Welcome Back! <br />
          Sign in with your credentials.
        </h1>

        <form className="w-full px-8 mt-5" onSubmit={handleLogin}>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Email</h4>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
              required
            />
          </div>

          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Password</h4>
            <div className="relative w-full">
              <input
                type={isShowPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                required
              />

              <Button
                type="button"
                className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <FiEye className="text-[18px]" /> : <FiEyeOff className="text-[18px]" />}
              </Button>
            </div>
          </div>

          <div className="form-group mb-4 w-full flex items-center justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember Me"
            />
          </div>

          <LoadingButton
            loading={loadingLogin}
            type="submit"
            variant="contained"
            fullWidth
            className="py-3 text-lg font-semibold"
          >
            Sign In
          </LoadingButton>
        </form>
      </div>
    </section>
  );
}
