import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Mycontext } from "../../App";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IoIosNotificationsOutline } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { FaRegUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { FcOvertime } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -2,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Header() {
  const { user, setUser, isLogin, setIsLogin } = useContext(Mycontext);
  const navigate = useNavigate();

  // ------------------- Account Menu -------------------
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => setAnchorMyAcc(event.currentTarget);
  const handleCloseMyAcc = () => setAnchorMyAcc(null);

  const token = localStorage.getItem("token")

  // ------------------- Logout -------------------
  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      localStorage.removeItem("token");
      setIsLogin(false);
      setUser(null);
      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // ------------------- Time -------------------
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString();

  // ------------------- Auth Check -------------------
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setIsLogin(false);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/user-details`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // send token properly
              "Cache-Control": "no-cache",
            },
          }
        );

        if (res.data.success) {
          setUser(res.data.data);
          setIsLogin(true);
        } else {
          setIsLogin(false);
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Error fetching user:", err.response?.status, err.response?.data);
      }
    };

    fetchUser();
  }, [navigate, setUser, setIsLogin]);

  // ------------------- JSX -------------------
  return (
    <header className="w-full h-auto py-2 pl-64 shadow-md pr-7 bg-[#fff] flex items-center justify-between">
      {/* Time Section */}
      <div className="part1">
        <Button className="!w-auto !h-[40px] !rounded-full !min-w-[40px] px-4 flex items-center gap-2 !text-[rgba(0,0,0,0.9)]">
          <FcOvertime className="text-[18px]" />
          <div className="text-sm">
            {formattedDate} {formattedTime}
          </div>
        </Button>
      </div>

      {/* Right Section */}
      <div className="part2 w-[40%] flex items-center justify-end gap-5">
        {/* Notifications */}
        <IconButton aria-label="notifications">
          <StyledBadge badgeContent={4} color="secondary">
            <IoIosNotificationsOutline />
          </StyledBadge>
        </IconButton>

        {/* User Avatar / Login Button */}
        {isLogin && user ? (
          <div className="relative">
            <div
              className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
              onClick={handleClickMyAcc}
            >
              <img
                src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/3781/3781986.png"}
                className="w-full h-full object-cover"
                alt="User Avatar"
              />
            </div>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorMyAcc}
              open={openMyAcc}
              onClose={handleCloseMyAcc}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              disableAutoFocusItem
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={handleCloseMyAcc}>
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-[35px] h-[35px] overflow-hidden">
                    <img
                      src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/3781/3781986.png"}
                      className="w-full h-full object-cover"
                      alt="User Avatar"
                    />
                  </div>
                  <div className="info">
                    <h3 className="text-[15px] font-[500] leading-5">{user?.name || "Unknown User"}</h3>
                    <p className="text-[12px] font-[400] opacity-70">{user?.email || "No email"}</p>
                  </div>
                </div>
              </MenuItem>

              <Divider />

              <MenuItem className="flex items-center gap-3">
                <FaRegUser className="text-[16px]" />
                <span className="text-[14px]">Profile</span>
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout} className="flex items-center gap-3">
                <IoMdLogOut className="text-[18px]" />
                <span className="text-[14px]">Sign Out</span>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to="/login">
            <Button className="btn-blue btn-sm !rounded-full">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
