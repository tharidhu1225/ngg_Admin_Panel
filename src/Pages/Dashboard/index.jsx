import React, { useState, useEffect, useContext } from "react";
import DashboardBoxes from "../../Components/DashboardBoxes";
import { Button } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Badge from "../../Components/Badge";
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import ProgressBar from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { VscTrash } from "react-icons/vsc";
import Pagination from '@mui/material/Pagination';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Gems from "../gems";
import { Mycontext } from "../../App";
import axios from "axios";  // Axios import missing in your original

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
  { id: 'product', label: 'PRODUCT', minWidth: 150 },
  { id: 'category', label: 'CATEGORY', minWidth: 100 },
  { id: 'subcategoty', label: 'SUB CATEGORY', minWidth: 150 },
  { id: 'price', label: 'PRICE', minWidth: 100 },
  { id: 'sales', label: 'SALES', minWidth: 80 },
  { id: 'action', label: 'ACTION', minWidth: 120 },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function Dashboard() {

  const context = useContext(Mycontext);  // <=== useContext inside function
  const { user, setUser } = context;

  const [isLogin, setIsLogin] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoruFilterValue, setCategoruFilterValue] = useState('');
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

  const [chartData, setChartData] = useState([
    { name: 'JAN', TotalSales: 4000, TotalUsers: 2400, amt: 2400 },
    { name: 'FEB', TotalSales: 3000, TotalUsers: 1398, amt: 2210 },
    { name: 'MARCH', TotalSales: 2000, TotalUsers: 9800, amt: 2290 },
    { name: 'APRIL', TotalSales: 2780, TotalUsers: 3908, amt: 2000 },
    { name: 'MAY', TotalSales: 1890, TotalUsers: 4800, amt: 2181 },
    { name: 'JUNE', TotalSales: 2390, TotalUsers: 3800, amt: 2500 },
    { name: 'JULY', TotalSales: 3490, TotalUsers: 1200, amt: 2100 },
    { name: 'AUG', TotalSales: 2590, TotalUsers: 7800, amt: 2100 },
    { name: 'SEP', TotalSales: 2490, TotalUsers: 9300, amt: 2100 },
    { name: 'OCT', TotalSales: 6490, TotalUsers: 4300, amt: 2100 },
    { name: 'NOV', TotalSales: 1490, TotalUsers: 8300, amt: 2100 },
    { name: 'DEC', TotalSales: 333, TotalUsers: 1776, amt: 2100 },
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/user-details`, {
          withCredentials: true,
          cache: 'no-store'
        });

        if (res.data.success) {
          setIsLogin(true);
          setUser(res.data.data);
        }
      } catch (err) {
        setIsLogin(false);
        setUser(null);
      }
    };

    checkAuth();
  }, [setUser]);

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    updateGreeting(); // initial set
    const interval = setInterval(updateGreeting, 60000); // update every 1 min

    return () => clearInterval(interval); // cleanup
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeCatFilter = (event) => {
    setCategoruFilterValue(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  return (
    <>
      <div className="w-full bg-[#fafafa] shadow-md py-2 px-5 p-5 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
        <div className="info">
          <h1 className="text-[35px] font-bold leading-10 mb-3">
            {greeting},<br /> {user?.name || "Admin"}.
          </h1>
          <p>Here's What happening on your store today. See the statistics at once.</p>

          <br />
          <div className="mt-4 space-x-3">
            <button
              className="btn-blue"
              onClick={() => context.setIsOpentFullScreenPanel({ open: true, model: "Add Gems" })}
            >
              + Add Gems
            </button>
            <button
              className="btn-blue"
              onClick={() => context.setIsOpentFullScreenPanel({ open: true, model: "Add Juwellery" })}
            >
              + Add Jewellery
            </button>
          </div>
        </div>

        <img src="shop-illustration.webp" className="w-[250px]" />
      </div>

      <DashboardBoxes />

           {/*Product Table Material UI*/}


        <div className="card my-4 shadow-md sm:rounded-lg bg-white">
            <div className="px-5 py-5">
          <Gems/>
          </div>
        </div>


           {/*Recent Order Table*/}

          <div className="card my-4 shadow-md sm:rounded-lg bg-white">
            <div className="flex items-center justify-between px-5 py-5">
                <h2 className="text-[18px] font-[600]">Recent Order</h2>
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


          {/*Chart*/}

           <div className="card my-4 shadow-md sm:rounded-lg bg-white">
            <div className="flex items-center justify-between px-5 py-5 pb-0">
                <h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>
            </div>


            <div className="flex items-center gap-5 px-5 py-5 pt-1">
                <span className="flex items-center gap-1 text-[15px]">
                    <span className="block w-[8px] h-[8px] rounded-full bg-[#82ca9d]"></span>
                    Total Users
                </span>

                <span className="flex items-center gap-1 text-[15px]">
                    <span className="block w-[8px] h-[8px] rounded-full bg-[#8884d8]"></span>
                    Total Sales
                </span>
            </div>


            <LineChart
                   width={1000}
                   height={500}
                   data={chartData}
                   margin={{
                   top: 5,
                   right: 30,
                   left: 20,
                   bottom: 5,
                  }}
                >
                   <CartesianGrid strokeDasharray="3 3" stroke="none"/>
                   <XAxis dataKey="name" tick={{fontSize: 12 }}/>
                   <YAxis tick={{fontSize: 12 }}/>
                   <Tooltip />
                   <Legend />
                   <Line strokeWidth={3} type="monotone" dataKey="TotalSales" stroke="#8884d8" activeDot={{ r: 8 }} />
                   <Line strokeWidth={3} type="monotone" dataKey="TotalUsers" stroke="#82ca9d" />
              </LineChart>
           </div>
        </>
    )
}