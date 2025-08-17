import React, { useState } from "react";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Badge from "../../Components/Badge";
import SearchBox from "../../Components/SearchBox";

export default function Orders () {

    const [isOpenOrderdProduct , setIsOpenOrderdProduct] = useState(null);
        
            const isShowOrderdProduct=(index)=>{
                if(isOpenOrderdProduct===index){
                   setIsOpenOrderdProduct(null); 
                }else{
                    setIsOpenOrderdProduct(index);
                }
            }

    return(
        <div className="card my-4 shadow-md sm:rounded-lg bg-white">
            <div className="flex items-center justify-between px-5 py-5">
                <h2 className="text-[18px] font-[600]">Orders List</h2>
                <div className="w-[40%]">
                    <SearchBox/>
                </div>
            </div>

            <div className="relative overflow-x-auto mt-5 pb-5">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-700">
                                               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-700">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">
                                                            &nbsp;
                                                         </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Order ID
                                                         </th>
                                                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                         Payment Id
                                                       </th>
                                                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                        Name
                                                       </th>
                                                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                          Phone Number
                                                       </th>
                                                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                          Address
                                                       </th>
                                                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                          Pincode
                                                       </th>
                                                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                          Total Amount
                                                       </th>
                                                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                          Email
                                                       </th>
                                                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                          User id
                                                       </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                          Order Status
                                                       </th>
                                                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                          Date
                                                       </th>
                                                    </tr>
                                             </thead>
                                              <tbody>
                                                <tr className="bg-white border-b dark:bg-gray-50 dark:border-gray-700">
                                                    <td className="px-6 py-4 font-[600]">
                                                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]" onClick={()=>isShowOrderdProduct(0)}>
                                                            {
                                                                isOpenOrderdProduct === 0 ? <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]"/> : <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]"/>
                                                            }
                                                                
                                                        </Button>
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]">
                                                        <span className="text-primary font-[600]">TN_249301</span>
                                                    </td>
                                                     <td className="px-6 py-4 font-[500]">
                                                        <span className="text-primary font-[600]">pay_PTPzeudsdheHdesiw</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-[500] whitespace-nowrap">Tharidu Dananjana</td>
                                                    <td className="px-6 py-4 font-[500]">0761918718</td>
                                                    <td className="px-6 py-4 font-[500]">
                                                        <span className="block w-[400px]">
                                                            No.73,bandaragala,weuda
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]">1022</td>
                                                    <td className="px-6 py-4 font-[500]">LKR.3,500.00</td>
                                                    <td className="px-6 py-4 font-[500]">jayasooriyatharidhu@gmail.com</td>
                                                    <td className="px-6 py-4 font-[500]">
                                                        <span className="text-primary font-[600]">tnif_249301</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]"><Badge status="pending"/></td>
                                                    <td className="px-6 py-4 font-[500] whitespace-nowrap">2025.05.18</td>
                                                </tr>
            
                                                {
                                                    isOpenOrderdProduct===0 && (
            
                                                    <tr>                                    
                                    <td className="pl-20" colSpan="6">
                                        <div className="relative overflow-x-auto">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-700">
                                               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-700">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Product ID
                                                         </th>
                                                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                         Product Title
                                                       </th>
                                                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                        Image
                                                       </th>
                                                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                          Quantity
                                                       </th>
                                                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                          Price
                                                       </th>
                                                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                          Subtotal
                                                       </th>
                                                    </tr>
                                             </thead>
                                              <tbody>
                                                <tr className="bg-white border-b dark:bg-gray-50 dark:border-gray-700">
                                                    <td className="px-6 py-4 font-[600]">
                                                        <span className="text-gray-600">TN_249301</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-[600]">
                                                        Original Grade (AAA) AirBud...
                                                    </td>
                                                     <td className="px-6 py-4 font-[600]">
                                                        <img src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-2-202307260626.jpg"
                                                         className="w-[40px] h-[40px] object-cover rounded-md"/>
                                                    </td>
                                                    <td className="px-6 py-4 font-[600] whitespace-nowrap">2</td>
                                                    <td className="px-6 py-4 font-[600]">LKR.1,500.00</td>
                                                    <td className="px-6 py-4 font-[600]">
                                                        LKR.1,800.00
                                                    </td>
                                                </tr>
            
                                                <tr className="bg-white border-b dark:bg-gray-50 dark:border-gray-700">
                                                    <td className="px-6 py-4 font-[600]">
                                                        <span className="text-gray-600">TN_249301</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-[600]">
                                                        Original Grade (AAA) AirBud...
                                                    </td>
                                                     <td className="px-6 py-4 font-[600]">
                                                        <img src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-2-202307260626.jpg"
                                                         className="w-[40px] h-[40px] object-cover rounded-md"/>
                                                    </td>
                                                    <td className="px-6 py-4 font-[600] whitespace-nowrap">2</td>
                                                    <td className="px-6 py-4 font-[600]">LKR.1,500.00</td>
                                                    <td className="px-6 py-4 font-[600]">
                                                        LKR.1,800.00
                                                    </td>
                                                </tr>
            
                                                <tr>
                                                    <td className="bg-[#f1f1f1]" colSpan="12"></td>
                                                </tr>
                                                
                                             </tbody>
                                           </table>
                                        </div>
                                                    </td>
                                                </tr>
                                                )}
            
            
                                             </tbody>
                                           </table>
                                        </div>
          </div>
    )
}