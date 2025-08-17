import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import { TfiGift } from "react-icons/tfi";
import { RiBarChartGroupedFill, RiProductHuntLine } from "react-icons/ri";
import { PiChartPieSliceLight } from "react-icons/pi";
import { BsBank } from "react-icons/bs";

export default function DashboardBoxes () {

    return(
    <>
     <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="box bg-white p-5 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                <TfiGift className="text-[40px] text-[#3872fa]"/>
                <div className="info w-[70%]">
                    <h3>New Orders</h3>
                    <b>1,390</b>
                </div>
                <RiBarChartGroupedFill className="text-[50px] text-[#3872fa]"/>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="box bg-white p-5 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                <PiChartPieSliceLight className="text-[50px] text-[#10b981]"/>
                <div className="info w-[70%]">
                    <h3>Sales</h3>
                    <b>LKR.55,320.00</b>
                </div>
                <RiBarChartGroupedFill className="text-[50px] text-[#10b981]"/>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="box bg-white p-5 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                <BsBank className="text-[40px] text-[#7928ca]"/>
                <div className="info w-[70%]">
                    <h3>Revenue</h3>
                    <b>LKR.12,500.00</b>
                </div>
                <RiBarChartGroupedFill className="text-[50px] text-[#7928ca]"/>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="box bg-white p-5 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                <RiProductHuntLine className="text-[40px] text-[#85193C]"/>
                <div className="info w-[70%]">
                    <h3>Total Products</h3>
                    <b>1,200</b>
                </div>
                <RiBarChartGroupedFill className="text-[50px] text-[#85193C]"/>
            </div>
        </SwiperSlide>
        
     </Swiper>
    </>

  )
}