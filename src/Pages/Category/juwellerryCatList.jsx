import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
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
import { LuEye } from "react-icons/lu";
import { Mycontext } from "../../App";
import axios from "axios";
import toast from "react-hot-toast";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
  { id: 'image', label: 'CATEGORY IMAGE', minWidth: 250 },
  { id: 'catName', label: 'CATEGORY NAME', minWidth: 250 },
  { id: 'action', label: 'ACTION', minWidth: 100 },
];

export default function JuwellerryCatList() {
  const context = useContext(Mycontext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 🔄 Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jewelleryCat/`, {
            withCredentials: true,
          });
      setCategories(res.data.categories);
    } catch (err) {
      console.error("Fetching error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this category?");
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/jewelleryCat/${id}`, {
            withCredentials: true,
          });
      // After delete, refetch or filter out
      setCategories(prev => prev.filter(cat => cat._id !== id));
      toast.success("Category deleted successfully!");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Something went wrong while deleting.");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Jewellery Category List</h2>
        <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
          <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() =>
              context.setIsOpentFullScreenPanel({
                open: true,
                model: "Add New Juwellery Category",
              })
            }
          >
            Add New Category
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
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
                .map((cat) => (
                  <TableRow key={cat._id}>
                    <TableCell>
                      <Checkbox {...label} size="small" />
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-4 w-[80px]">
                        <div className="img w-full rounded-md overflow-hidden group">
                          <img
                            src={cat?.images?.[0]?.url}
                            className="w-full group-hover:scale-105 transition-all"
                            alt="Category"
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Chip label={cat.catName} />
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">

                        <Button
                          onClick={() => handleDelete(cat._id)}
                          className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.9)] !rounded-full hover:!bg-[#ccc]"
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
