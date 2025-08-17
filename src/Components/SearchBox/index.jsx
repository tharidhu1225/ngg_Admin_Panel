import React from "react";
import { TbSearch } from "react-icons/tb";

export default function SearchBox () {
    return(
        <div className="w-full h-auto bg-[#f1f1f1] relative overflow-hidden">
            <TbSearch className="absolute top-[13px] left-[10px] z-50 pointer-events-none opacity-80"/>
            <input type="text" 
            className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] bg-[#f1f1f1] p-2 pl-8 focus:outline-none focus:border-primary rounded-md text-[13px]"
            placeholder="Search Products..."/>
        </div>
    )
}