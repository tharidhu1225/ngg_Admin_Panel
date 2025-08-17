import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

{/*Material UI Table Dependancies */}

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { AiOutlineEdit } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import { LuEye } from "react-icons/lu";
import SearchBox from "../../Components/SearchBox";
import { Mycontext } from "../../App";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

{/*Path For Material UI*/}

const columns = [
  
  { id: 'userImg', label: 'USER IMAGE', minWidth: 80 },
  { id: 'userName', label: 'USER NAME', minWidth: 100 },
  {
    id: 'userEmail',
    label: 'USER EMAIL',
    minWidth: 150,
  },
  {
    id: 'userPhone',
    label: 'USER PHONE NO',
    minWidth: 100,
  },
  {
    id: 'createdDate',
    label: 'CREATED DATE',
    minWidth: 100,
  },
  {
    id: 'action',
    label: 'ACTION',
    minWidth: 120,
  },
];

export default function Users () {

    const context = useContext(Mycontext);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

    return(
        <>
                    
           {/*Product Table Material UI*/}
           
            <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
           
                   <div className="flex items-center w-full px-5 justify-between">
                       <div className="col w-[20%]">
                           <h2 className="text-[18px] font-[600]">Users List</h2>
                       </div>

                       <div className="col w-[40%] ml-auto">
                        <SearchBox/>
                       </div>

                   </div>
           
               <div className="relative overflow-x-auto mt-5 pb-5">
           
                       <TableContainer sx={{ maxHeight: 440 }}>
                   <Table stickyHeader aria-label="sticky table">
                     <TableHead>
                       <TableRow>
                           <TableCell><Checkbox {...label} size="small"/></TableCell>
                         {columns.map((column) => (
                           <TableCell
                             key={column.id}
                             align={column.align}
                             style={{ minWidth: column.minWidth }}
                           >
                             {column.label}
                           </TableCell>
                         ))}
                       </TableRow>
                     </TableHead>
                     <TableBody>
           
                       <TableRow>
                           <TableCell style={{minWidth: columns.minWidth}}>
                               <Checkbox {...label} size="small"/>
                           </TableCell>
           
                           <TableCell style={{minWidth: columns.minWidth}}>
                                <div className="flex items-center gap-4 w-[70px]">
                                       <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                          <Link to="/product/5324">
                                               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s" 
                                                   className="w-full group-hover:scale-105 transition-all"/>
                                           </Link>
                                       </div>
                                </div>
                           </TableCell>
           
                           <TableCell style={{minWidth: columns.minWidth}}>
                               tharidu Dhananjana
                           </TableCell>
           
                           <TableCell style={{minWidth: columns.minWidth}}>
                              <span className="flex items-center gap-2">
                                 <MdOutlineMarkEmailRead/> jayasooriyatharidhu@gmail.com
                              </span>
                           </TableCell>
           
                           <TableCell style={{minWidth: columns.minWidth}}>
                               <span className="flex items-center gap-2">
                                 <FaPhoneAlt/> 0761918718
                              </span>
                           </TableCell>

                           <TableCell style={{minWidth: columns.minWidth}}>
                              <span className="flex items-center gap-2">
                                <FcCalendar/> 2025,05,29
                              </span>
                           </TableCell>
           
                           <TableCell style={{minWidth: columns.minWidth}}>
                              <div className="flex items-center gap-1">
           
                                   <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.9)] !rounded-full hover:!bg-[#ccc]">
                                           <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]"/>
                                   </Button>
           
                                   <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.9)] !rounded-full hover:!bg-[#ccc]">
                                           <VscTrash className="text-[rgba(0,0,0,0.7)] text-[20px] text-red-700"/>
                                   </Button>
           
                               </div>
                           </TableCell>
           
                       </TableRow>
                       
                     </TableBody>
                   </Table>
                 </TableContainer>
                 <TablePagination
                   rowsPerPageOptions={[10, 25, 100]}
                   component="div"
                   count={10}
                   rowsPerPage={rowsPerPage}
                   page={page}
                   onPageChange={handleChangePage}
                   onRowsPerPageChange={handleChangeRowsPerPage}
                 />
                   </div>
            </div>
        </>
    )
}