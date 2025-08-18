import React, { useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LuLogIn } from "react-icons/lu";
import { FaUserPlus } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFb, setLoadingFb] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  // 🟢 Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleClickGoolge() {
    setLoadingGoogle(true);
  }

  function handleClickFb() {
    setLoadingFb(true);
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoadingLogin(true);
    setErrorMsg("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        // 🟢 Successful login
        navigate("/"); // 🔁 change to your desired route
      } else {
        setErrorMsg(res.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <section className="bg-white w-full h-full">
      <img src="/pattern2.jpg" className="w-full fixed top-0 left-0 opacity-20" />

      <div className="loginBox card w-[600px] h-[auto] pb-20 mx-auto pt-20 relative z-50">
        <div className="text-center">
          <img src="/logo.jpg" className="m-auto w-[150px]" />
        </div>

        <h1 className="text-center text-[30px] text-[#191919] font-[800] mt-0">
          Welcome Back! <br />
          Sign in with your credentials.
        </h1>

        <div className="flex items-center justify-between mt-5">
        <form className="w-full px-8 mt-3" onSubmit={handleLogin}>
          {errorMsg && (
            <div className="text-red-600 font-[600] mb-4">{errorMsg}</div>
          )}

          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Email</h4>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
            />
          </div>

          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Password</h4>
            <div className="relative w-full">
              <input
                type={isShowPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
              />

              <Button
                className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? (
                  <FiEye className="text-[18px]" />
                ) : (
                  <FiEyeOff className="text-[18px]" />
                )}
              </Button>
            </div>
          </div>

          <div className="form-group mb-4 w-full flex items-center justify-between">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
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
      </div>
    </section>
  );
}
