import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';

import { AiOutlineEdit } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";

import { Mycontext } from "../../App";
import toast from "react-hot-toast";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
  { id: 'image', label: 'CATEGORY IMAGE', minWidth: 250 },
  { id: 'catName', label: 'CATEGORY NAME', minWidth: 250 },
  { id: 'subCatName', label: 'SUB CATEGORY NAME', minWidth: 400 },
  { id: 'action', label: 'ACTION', minWidth: 100 },
];

export default function GemCategoryList () {
  const context = useContext(Mycontext);
  const [categoryFilterValue, setCategoryFilterValue] = useState('');
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 🟢 Fetch Categories from Backend
  const fetchCategories = async () => {
    try {
      const query = categoryFilterValue ? `?catName=${categoryFilterValue}` : '';
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gemCat${query}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.error("Error fetching categories:", err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [categoryFilterValue]);

  const handleChangeCatFilter = (event) => {
    setCategoryFilterValue(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this category?")) return;

  try {
    const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/gemCat/${id}`, {
      withCredentials: true,
    });

    if (res.data.success) {
      toast.success("Category deleted!");
      fetchCategories(); // refresh list
    } else {
      toast.error(res.data.message || "Delete failed");
    }
  } catch (err) {
    console.error("Delete error:", err.message);
    toast.error("Server error");
  }
};

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Gem Category List</h2>

        <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
          <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() =>
              context.setIsOpentFullScreenPanel({
                open: true,
                model: 'Add New Gem Category'
              })
            }
          >
            Add New Gem Category
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 items-center mt-5 mb-2">
        <label className="text-sm font-medium">Filter by Category:</label>
        <select
          value={categoryFilterValue}
          onChange={handleChangeCatFilter}
          className="border border-gray-300 px-3 py-1 rounded"
        >
          <option value="">All</option>
          <option value="Precious">Precious</option>
          <option value="Semi Precious">Semi Precious</option>
        </select>
      </div>

      {/* Table */}
      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    width={column.minWidth}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox {...label} size="small" />
                    </TableCell>

                    <TableCell>
                        <div className="w-[80px] h-[80px] rounded overflow-hidden">
                            {row.images?.[0]?.url && (
                                <img
                                src={row.images[0].url}
                                className="w-full h-full object-cover"
                                alt="gem-category"
                                />
                            )}
                        </div>
                    </TableCell>

                    <TableCell>
                      <Chip label={row.catName} />
                    </TableCell>

                    <TableCell>
                      <Chip label={row.name} color="primary" />
                    </TableCell>

                    <TableCell>
                          <div className="flex items-center gap-1">
                                <Button
                                    className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.9)] !rounded-full hover:!bg-[#ccc]"
                                    onClick={() => handleDelete(row._id)}
                                >
                                    <VscTrash className="text-[rgba(0,0,0,0.7)] text-[20px] text-red-700" />
                                </Button>
                            </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
