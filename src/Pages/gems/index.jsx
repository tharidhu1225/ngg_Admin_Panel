import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Select, MenuItem,
  Checkbox, LinearProgress
} from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import { LuEye } from "react-icons/lu";
import SearchBox from "../../Components/SearchBox";
import { Mycontext } from "../../App";
import toast from "react-hot-toast";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
  { id: 'product', label: 'PRODUCT', minWidth: 150 },
  { id: 'category', label: 'CATEGORY', minWidth: 100 },
  { id: 'subCategory', label: 'SUB CATEGORY', minWidth: 150 },
  { id: 'price', label: 'PRICE', minWidth: 100 },
  { id: 'sales', label: 'SALES', minWidth: 80 },
  { id: 'action', label: 'ACTION', minWidth: 120 },
];

export default function Gems() {
  const context = useContext(Mycontext);

  const [categoryFilterValue, setCategoryFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [gems, setGems] = useState([]); // always an array
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const baseURL = import.meta.env.VITE_BACKEND_URL || "";

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/gemCat`);
      if (res.data.success) setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

const fetchGems = async () => {
    setLoading(true);
    try {
      const params = {
        category: categoryFilterValue || undefined,
        search: searchValue || undefined,
        limit: rowsPerPage,
        page: page + 1,
      };

      Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

      const res = await axios.get(`${baseURL}/api/gem`, {
        withCredentials: true,
        params,
      });

      if (res.data.success) {
        setGems(res.data.data || []);
        setTotalCount(res.data.totalCount || res.data.data.length);
      } else {
        setGems([]);
      }
    } catch (error) {
      console.error("Error fetching gem:", error);
    }
    setLoading(false);
  };


  useEffect(() => {
    fetchCategories();
    fetchGems();
  }, [categoryFilterValue, searchValue, page, rowsPerPage]);

  const handleChangeCatFilter = (event) => {
    setCategoryFilterValue(event.target.value);
    setPage(0);
  };

  const handleSearch = (val) => {
    setSearchValue(val);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteGem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gem?")) return;

    try {
      const res = await axios.delete(`${baseURL}/api/gem/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Gem deleted successfully.");
        fetchGems();
      } else {
        toast.error("Failed to delete gem.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Gems</h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() => context.setIsOpentFullScreenPanel({
              open: true,
              model: 'Add Gems'
            })}
          >
            Add Gems
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between">
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
            <Select
              className="w-full"
              size="small"
              value={categoryFilterValue}
              onChange={handleChangeCatFilter}
            >
              <MenuItem value=""><em>All Categories</em></MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.catName}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="col w-[20%] ml-auto">
            <SearchBox onSearch={handleSearch} />
          </div>
        </div>

        <div className="relative overflow-x-auto mt-5 pb-5">
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell><Checkbox {...label} size="small" /></TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} align="center">Loading...</TableCell>
                  </TableRow>
                ) : Array.isArray(gems) && gems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} align="center">No gems found.</TableCell>
                  </TableRow>
                ) : (
                  gems.map((gem) => (
                    <TableRow key={gem._id}>
                      <TableCell><Checkbox {...label} size="small" /></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4 w-[300px]">
                          <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <img
                              src={gem.images?.[0]?.url || "https://via.placeholder.com/65"}
                              alt={gem.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-all"
                            />
                          </div>
                          <div className="info w-[75%]">
                            <h3 className="font-[600] text-[12px] leading-4">{gem.name}</h3>
                            <span className="text-[12px]">{gem.description || "No description"}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{gem.category?.catName || "No Category"}</TableCell>
                      <TableCell>{gem.category?.name || "No Subcategory"}</TableCell>
                      <TableCell>Rs: {gem.price}</TableCell>
                      <TableCell>
                        <div className="flex flex-col justify-center">
                          <p className="text-[13px] font-[500] mb-1">{gem.sales} sales</p>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(gem.sales, 100)}
                            sx={{
                              height: 8,
                              borderRadius: 5,
                              backgroundColor: '#f2f2f2',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: gem.sales > 70 ? '#22c55e' : gem.sales > 30 ? '#facc15' : '#ef4444',
                              },
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button className="!w-[35px] !h-[35px] !bg-[#f1f1f1] !border !rounded-full hover:!bg-[#ccc]">
                            <AiOutlineEdit className="text-[20px] text-black" />
                          </Button>
                          <Button className="!w-[35px] !h-[35px] !bg-[#f1f1f1] !border !rounded-full hover:!bg-[#ccc]">
                            <LuEye className="text-[20px] text-black" />
                          </Button>
                          <Button
                            className="!w-[35px] !h-[35px] !bg-[#f1f1f1] !border !rounded-full hover:!bg-[#ccc]"
                            onClick={() => handleDeleteGem(gem._id)}
                          >
                            <VscTrash className="text-[20px] text-red-700" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
}
