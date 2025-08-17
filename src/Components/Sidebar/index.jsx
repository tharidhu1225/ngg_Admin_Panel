import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { LiaProductHunt } from "react-icons/lia";
import { BiCategory } from "react-icons/bi";
import { LuFileBox } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import {Collapse} from 'react-collapse';
import { Mycontext } from "../../App";


export default function Sidebar () {

    const [submenuIndex , setSubmenuIndex] = useState(null);

    const context = useContext(Mycontext)

    const isOpenSubMenu = (index) => {
        if(submenuIndex===index){
            setSubmenuIndex(null)
        }else{
            setSubmenuIndex(index)
        }
        
    }  

    return(
        <>
          <div className="sidebar fixed top-0 left-0 bg-[#fff] w-[16%] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4">
            <div className="py-2 w-full">
                <Link to='/'>
                  <img src="logo.jpg" className="w-[120px]"/>
                </Link>
            </div>

            <ul className="mt-4">
                <li>
                    <Link to='/'>
                    <Button className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
                        <RxDashboard className="text-[18px]"/> <span>Dashboard</span>
                    </Button>
                    </Link>
                </li>

                <li>
                    <Button className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]" onClick={()=>isOpenSubMenu(1)}>
                        <FaRegImage className="text-[18px]"/> <span>Home Slides</span>
                        <span className="ml-auto w-[30px] h-[30px] flex items-center">
                            <FaAngleDown className={`transition-all ${submenuIndex===1 ? "rotate-180" : ""}`}/>
                        </span>
                    </Button>

                     <Collapse isOpened={submenuIndex===1 ? true : false}>
                       <ul className="w-full">
                        <li className="w-full">
                            <Link to="/homeSlider/list">
                            <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>Home Banners List
                            </Button>
                            </Link>
                        </li>

                        <li className="w-full">
                            <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>Home Banner Slide
                            </Button>
                        </li>
                      </ul>
                     </Collapse>

                </li>

                <li>
                    <Link to='/users'>
                    <Button className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
                        <FiUsers className="text-[18px]"/> <span>Users</span>
                    </Button>
                    </Link>
                </li>

                <li>
                    <Button className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]" onClick={()=>isOpenSubMenu(3)}>
                        <LiaProductHunt className="text-[18px]"/> <span>Products</span>
                        <span className="ml-auto w-[30px] h-[30px] flex items-center">
                            <FaAngleDown className={`transition-all ${submenuIndex===3 ? "rotate-180" : ""}`}/>
                        </span>
                    </Button>

                     <Collapse isOpened={submenuIndex===3 ? true : false}>
                       <ul className="w-full">
                        <li className="w-full">
                            <Link to='/gems'>
                            <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>Gems List
                            </Button>
                            </Link>
                        </li>

                        <li className="w-full">
                            <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3" onClick={()=>context.setIsOpentFullScreenPanel({
                                open:true,
                                model:"Add Gems"
                            })}>
                                <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>Add Gems
                            </Button>
                        </li>
                      </ul>
                      <ul className="w-full">
                        <li className="w-full">
                            <Link to='/juwellery'>
                            <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>Juwellery List
                            </Button>
                            </Link>
                        </li>

                        <li className="w-full">
                            <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3" onClick={()=>context.setIsOpentFullScreenPanel({
                                open:true,
                                model:"Add Juwellery"
                            })}>
                                <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>Add Juwellery
                            </Button>
                        </li>
                      </ul>
                     </Collapse>

                </li>

                <li>
                    <Button className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]" onClick={()=>isOpenSubMenu(4)}>
                        <BiCategory className="text-[18px]"/> <span>Category</span>
                        <span className="ml-auto w-[30px] h-[30px] flex items-center">
                            <FaAngleDown className={`transition-all ${submenuIndex===4 ? "rotate-180" : ""}`}/>
                        </span>
                    </Button>

                     <Collapse isOpened={submenuIndex===4 ? true : false}>
                       <ul className="w-full">
                        <li className="w-full">
                            <Link to='/gemCategory/list'>
                            <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>Gem Category List
                            </Button>
                            </Link>
                        </li>

                        <li className="w-full">
                            <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3" onClick={()=>context.setIsOpentFullScreenPanel({
                        open:true,
                        model:'Add New Gem Category'
                    })}>
                                <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>Add a Gem Category
                            </Button>
                        </li>

                         <li className="w-full">
                            <Link to='/juwellerryCat/list'>
                            <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>Juwellery Category List
                            </Button>
                            </Link>
                        </li>

                        <li className="w-full">
                            <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3" onClick={()=>context.setIsOpentFullScreenPanel({
                        open:true,
                        model:'Add New Juwellery Category'
                    })}>
                                <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>Add Juwellery Category
                            </Button>                            
                        </li>
                      </ul> 
                     </Collapse>

                </li>


                <li>
                    <Link to='/orders'>
                    <Button className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
                        <LuFileBox className="text-[18px]"/> <span>Orders</span>
                    </Button>
                    </Link>
                </li>

                <li>
                    <Button className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
                        <IoMdLogOut className="text-[20px]"/> <span>Logout</span>
                    </Button>
                </li>
            </ul>
          </div>
        </>
    )
}