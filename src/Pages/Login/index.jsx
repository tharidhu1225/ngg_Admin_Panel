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
      <header className="w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
        <Link to="/">
          <img src="/logo.jpg" className="w-[150px]" />
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/login" exact="true" activeclassname="isActive">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.9)] !px-5 flex gap-2">
              <LuLogIn className="text-[18px]" />
              Login
            </Button>
          </NavLink>

          <NavLink to="/sign-up" exact="true" activeclassname="isActive">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.9)] !px-5 flex gap-2">
              <FaUserPlus className="text-[15px]" />
              Sign up
            </Button>
          </NavLink>
        </div>
      </header>
      <img src="/pattern2.jpg" className="w-full fixed top-0 left-0 opacity-20" />

      <div className="loginBox card w-[600px] h-[auto] pb-20 mx-auto pt-20 relative z-50">
        <div className="text-center">
          <img src="icon.png" className="m-auto w-[150px]" />
        </div>

        <h1 className="text-center text-[30px] text-[#191919] font-[800] mt-0">
          Welcome Back! <br />
          Sign in with your credentials.
        </h1>

        <div className="flex items-center justify-center w-full mt-5 gap-4">
          <LoadingButton
            size="small"
            onClick={handleClickGoolge}
            endIcon={<FcGoogle />}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !text-[rgb(0,0,0)] !text-[16px] !capitalize !px-5"
          >
            Sign In With Google
          </LoadingButton>

          <LoadingButton
            size="small"
            onClick={handleClickFb}
            endIcon={<BsFacebook />}
            loading={loadingFb}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !text-[rgba(0,0,0)] !text-[16px] !capitalize !px-5"
          >
            Sign In With Facebook
          </LoadingButton>
        </div>

        <br />

        <div className="w-full flex items-center justify-center gap-3">
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
          <span className="text-[15px] font-[500]">Or, Sign in with your email</span>
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
        </div>

        <br />

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

            <Link
              to="/forgot-password"
              className="text-primary font-[700] text-[15px] hover:underline hover:text-gray-600"
            >
              Forgot Password?
            </Link>
          </div>

          <LoadingButton
            loading={loadingLogin}
            type="submit"
            variant="contained"
            fullWidth
            className="!bg-blue-600 hover:!bg-blue-700 !text-white !py-3 !rounded-md !text-[16px] !capitalize"
          >
            Sign In
          </LoadingButton>
        </form>
      </div>
    </section>
  );
}
