import React from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoCloseOutline } from "react-icons/io5";
import Button from "@mui/material/Button";
import { MdOutlineFileUpload } from "react-icons/md";

export default function AddHomeSlide () {
    return(
        <section className="p-5 bg-gray-50">
            <form className="form py-3 p-8">
                <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
                    <div className="grid grid-cols-7 gap-4">

                        <div className="uploadBoxWrapper relative">
                                        <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer">
                                            <IoCloseOutline className="text-white text-[17px]"/>
                                        </span>
                    
                    
                                        <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.5)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                            <LazyLoadImage
                                            className="w-full h-full object-cover"
                                            effect="blur"
                                            wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: {transitionDelay: "1s"},
                                            }}
                                            alt={"image"}
                                            src={'https://api.spicezgold.com/download/file_1734527074321_ksc-khatushyam-collection-red-pu-for-women-handheld-bag-product-images-rvvxdnkjfy-0-202405290001.webp'} // use normal <img> attributes as props
                                            />
                                        </div>
                        </div>
                                       
                        <UploadBox multiple={true}/>

                    </div>
                </div>

                <br/>
                <br/>

                <div className="w-[250px]">
                    <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
                      <MdOutlineFileUpload className="text-[25px] text-white"/>Publish & View
                    </Button>
                </div>

            </form>
        </section>    
    )
}