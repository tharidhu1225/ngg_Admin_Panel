import React, { useState } from "react";
import {Link, NavLink} from 'react-router-dom';
import Button from '@mui/material/Button';
import { LuLogIn } from "react-icons/lu";
import { FaUserPlus } from "react-icons/fa6";
import LoadingButton from '@mui/lab/LoadingButton'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

export default function ForgotPassword () {

    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingFb, setLoadingFb] = useState(false);

    const [isShowPassword , setIsShowPassword] = useState(false);
  
    function handleClickGoolge() {
    setLoadingGoogle(true);
    }

    function handleClickFb() {
    setLoadingFb(true);
    }

    return(
        <section className="bg-white w-full h-[100vh]">
            <header className="w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
                <Link to="/">
                <img src="/logo.jpg" className="w-[150px]"/>
                </Link>


                <div className="flex items-center gap-2">
                    <NavLink to="/login" exact={true} activeClassName="isActive">
                    <Button className="!rounded-full !text-[rgba(0,0,0,0.9)] !px-5 flex gap-2">
                        <LuLogIn className="text-[18px]"/>Login
                    </Button>
                    </NavLink>

                    <NavLink to="/sign-up" exact={true} activeClassName="isActive">
                    <Button className="!rounded-full !text-[rgba(0,0,0,0.9)] !px-5 flex gap-2">
                        <FaUserPlus className="text-[15px]"/>Sign up
                    </Button>
                    </NavLink>
                </div>
            </header>
            <img src="/pattern2.jpg" className="w-full fixed top-0 left-0 opacity-20"/>

            <div className="loginBox card w-[600px] h-[auto] pb-20 mx-auto pt-20 relative z-50">
                <div className="text-center">
                    <img src="icon.png" className="m-auto w-[150px]"/>
                </div>

                <h1 className="text-center text-[30px] text-[#191919] font-[800] mt-0">Having trouble to sign in?<br/>
                   Reset your password.
                </h1>

                <br/>

                <form className="w-full px-8 mt-3">
                    <div className="form-group mb-4 w-full">
                        <h4 className="text-[14px] font-[500] mb-1">Email</h4>
                        <input
                         type="email"
                         className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3" placeholder="Enter Your Email"/>
                    </div>


                    <Button className="btn-blue btn-lg !w-full">Reset Password</Button>

                    <br/><br/>

                    <div className="text-center flex items-center justify-center gap-4">
                        <span>Don’t want to reset?</span>
                        <Link to="/login" className="text-primary font-[700] text-[15px] hover:underline hover:text-gray-600">Sign In</Link>
                    </div>

                </form>

            </div>
        </section>
    )
}