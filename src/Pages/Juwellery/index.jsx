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
import toast from "react-hot-toast";
import SearchBox from "../../Components/SearchBox";
import { Mycontext } from "../../App";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
  { id: 'product', label: 'PRODUCT', minWidth: 150 },
  { id: 'category', label: 'CATEGORY', minWidth: 100 },
  { id: 'price', label: 'PRICE', minWidth: 100 },
  { id: 'weight', label: 'WEIGHT (g)', minWidth: 100 },
  { id: 'stock', label: 'STOCK', minWidth: 100 },
  { id: 'action', label: 'ACTION', minWidth: 120 },
];

export default function JewelleryList() {
  const context = useContext(Mycontext);

  const [categoryFilterValue, setCategoryFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/jewelleryCat`, {
        withCredentials: true,
      });
      if (res.data.success) setCategories(res.data.categories);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchJewellery = async () => {
    setLoading(true);
    try {
      const params = {
        category: categoryFilterValue || undefined,
        search: searchValue || undefined,
        limit: rowsPerPage,
        page: page + 1,
      };

      Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

      const res = await axios.get(`${baseURL}/api/jewellery`, {
        withCredentials: true,
        params,
      });

      if (res.data.success) {
        setItems(res.data.data || []);
        setTotalCount(res.data.totalCount || res.data.data.length);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching jewellery:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchJewellery();
  }, [categoryFilterValue, searchValue, page, rowsPerPage]);

  const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this item?");
  if (!confirm) return;

  try {
    const res = await axios.delete(`${baseURL}/api/jewellery/${id}`, {
      withCredentials: true,
    });

    if (res.data.success) {
      toast.success("Item deleted successfully.");
      fetchJewellery(); // Refresh list
    } else {
      toast.error(res.data.message || "Failed to delete item.");
    }
  } catch (err) {
    console.error("Delete error:", err);
    toast.error("Something went wrong while deleting.");
  }
};


  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeCatFilter = (event) => {
    setCategoryFilterValue(event.target.value);
    setPage(0);
  };

  const handleSearch = (val) => {
    setSearchValue(val);
    setPage(0);
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Jewellery</h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() =>
              context.setIsOpentFullScreenPanel({
                open: true,
                model: "Add Jewellery",
              })
            }
          >
            Add Jewellery
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
                    <TableCell colSpan={columns.length + 1} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} align="center">
                      No jewellery found.
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell><Checkbox {...label} size="small" /></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4 w-[300px]">
                          <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <img
                              src={item.images?.[0]?.url || "https://via.placeholder.com/65"}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-all"
                            />
                          </div>
                          <div className="info w-[75%]">
                            <h3 className="font-[600] text-[12px] leading-4">{item.name}</h3>
                            <span className="text-[12px]">{item.description || "No description"}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.category?.catName || "No Category"}</TableCell>
                      <TableCell>Rs: {item.price}</TableCell>
                      <TableCell>{item.weight} g</TableCell>
                      <TableCell>{item.stock}</TableCell>
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
                            onClick={() => handleDelete(item._id)}
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
