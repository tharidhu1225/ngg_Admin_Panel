import React from "react";

export default function Badge (props) {
    return(
        <span className={`inline-block py-1 px-4 text-[11px] rounded-full capitalize 
        ${props.status === "pending" && 'bg-red-500 text-white'}
        ${props.status === "confirm" && 'bg-blue-500 text-white'}
        ${props.status === "deliverd" && 'bg-green-500 text-white'}
        `}>
            {props.status}
        </span>
    )
}