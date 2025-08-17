import React from "react";

export default function ProgressBar (props) {
    return(
        <div className="w-[100px] h-auto overflow-hidden rounded-md bg-[#d3d0d0]">
            <span className={`flex items-center w-[${props.value}%] h-[8px]
             ${props.type==="success" && 'bg-green-600'}
             ${props.type==="error" && 'bg-pink-600'}
             ${props.type==="waring" && 'bg-orange-400'}`}
            ></span>
        </div>
    )
}