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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ProgressBar from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import { LuEye } from "react-icons/lu";
import SearchBox from "../../Components/SearchBox";
import { Mycontext } from "../../App";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

{/*Path For Material UI*/}

const columns = [
  
  { id: 'image', label: 'IMAGE', minWidth: 250 },
  { id: 'action', label: 'ACTION', minWidth: 100 },
];

export default function HomeSliderBanners () {

    const context = useContext(Mycontext);

    const [categoruFilterValue, setCategoruFilterValue] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangeCatFilter = (event) => {
    setCategoruFilterValue(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

    return(
        <>

            <div className="flex items-center justify-between px-2 py-0 mt-3">
                <h2 className="text-[18px] font-[600]">Home Slider Banners</h2>

                <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
                    <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
                    <Button className="btn-blue !text-white btn-sm" onClick={()=>context.setIsOpentFullScreenPanel({
                        open:true,
                        model:'Add Home Slide'
                    })}>Add Home Slide</Button>
                </div>
            </div>
                    
           {/*Product Table Material UI*/}
           
        <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">

                <TableContainer sx={{ maxHeight: 440 }}>
                   <Table stickyHeader aria-label="sticky table">
                     <TableHead>
                       <TableRow>
                           <TableCell width={60}>
                               <Checkbox {...label} size="small"/>
                           </TableCell>
                         {columns.map((column) => (
                           <TableCell
                            width={column.minWidth} 
                            key={column.id}
                            align={column.align}
                            >
                            {column.label}
                           </TableCell>
                         ))}
                       </TableRow>
                     </TableHead>
                     <TableBody>
           
                       <TableRow>
                           <TableCell>
                               <Checkbox {...label} size="small"/>
                           </TableCell>
           
                           <TableCell width={300}>
                                <div className="flex items-center gap-4 w-[300px]">
                                        <div className="img w-full rounded-md overflow-hidden group">
                                           <Link to="/product/5324">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUa_BdUr3BZZmYwm8P5JafPAqcyKE3BN74Vg&s" 
                                                   className="w-full group-hover:scale-105 transition-all"/>
                                            </Link>
                                        </div>
                                </div>
                           </TableCell>
           
                           <TableCell width={100}>
                              <div className="flex items-center gap-1">
           
                                   <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.9)] !rounded-full hover:!bg-[#ccc]">
                                           <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]"/>
                                   </Button>
           
                                   <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.9)] !rounded-full hover:!bg-[#ccc]">
                                           <LuEye className="text-[rgba(0,0,0,0.7)] text-[20px]"/>
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
            
        </>
    )
}