import React, { useState } from "react";
import {Link, NavLink} from 'react-router-dom';
import Button from '@mui/material/Button';
import { LuLogIn } from "react-icons/lu";
import { FaUserPlus } from "react-icons/fa6";
import OtpInput from "../../Components/OTPInputBox";

export default function VerifyAccount () {

    const [otp , setOtp] = useState("");
        const handleOtpChange = (value) => {
            setOtp(value)
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
                    <img src="verify.png" className="w-[100px] m-auto"/>
                </div>

                <h1 className="text-center text-[30px] text-[#191919] font-[800] mt-0">Welcome Back! <br/>
                    Please Verify Your Email.
                </h1>

                <br/>

                <p className="text-center text-[15px]">OTP Send to &nbsp;
                    <span className="text-primary font-bold">jayasooriyatharidhu@gmail.com</span>
                </p>

                <br/>


                <div className="text-center flex items-center justify-center flex-col">
                    <OtpInput length={6} onChange={handleOtpChange}/>
                </div>

                <br/>

                <div className="w-[300px] m-auto">
                    <Button className="btn-blue w-full">Verify</Button>
                </div>

            </div>
        </section>
    )
}