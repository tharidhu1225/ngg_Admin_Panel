import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import toast from "react-hot-toast";

export default function AddJuwellery() {
  const [juwellerryData, setJuwellerryData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    weight: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // Auth token

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/jewelleryCat`,
          { withCredentials: true }
        );
        if (res.data.success) setCategories(res.data.categories);
        else toast.error("Failed to fetch categories");
      } catch (err) {
        console.error(err);
        toast.error("Error fetching categories");
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setJuwellerryData({ ...juwellerryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, price, weight, category } = juwellerryData;

    if (!name || !price || !weight || !category || images.length === 0) {
      toast.error("Please fill all required fields and upload at least one image.");
      return;
    }

    if (!token) {
      toast.error("You must be logged in to perform this action.");
      return;
    }

    if (images.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    setLoading(true);
    try {
      // ---------------- Upload Images ----------------
      const formData = new FormData();
      images.forEach((img) => formData.append("images", img));

      const uploadRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/jewellery/uploadImages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (!uploadRes.data.success || !uploadRes.data.images?.length) {
        toast.error("Image upload failed.");
        setLoading(false);
        return;
      }

      const uploadedImageUrls = uploadRes.data.images;

      // ---------------- Submit Jewellery ----------------
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/jewellery/create`,
        { ...juwellerryData, images: uploadedImageUrls },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Jewellery created successfully!");
        setJuwellerryData({
          name: "",
          description: "",
          price: "",
          stock: "",
          weight: "",
          category: "",
        });
        setImages([]);
      } else {
        toast.error("Failed to create jewellery.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Jewellery</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          name="name"
          label="Jewellery Name"
          value={juwellerryData.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          value={juwellerryData.price}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="stock"
          label="Stock"
          type="number"
          value={juwellerryData.stock}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="weight"
          label="Weight (g)"
          type="number"
          value={juwellerryData.weight}
          onChange={handleChange}
          fullWidth
          required
        />

        {/* Category Dropdown */}
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={juwellerryData.category}
            onChange={handleChange}
            label="Category"
          >
            <MenuItem value="">Select Category</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.catName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="description"
          label="Description"
          value={juwellerryData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />
      </div>

      {/* Image Upload Section */}
      <div className="mt-10">
        <label className="block font-semibold mb-2">Upload Images</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {images.map((file, idx) => (
            <div key={idx} className="relative">
              <span
                onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                className="absolute top-1 right-1 bg-red-700 text-white w-[20px] h-[20px] text-xs rounded-full flex items-center justify-center cursor-pointer z-50"
              >
                ✕
              </span>
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                className="w-full h-32 object-cover rounded-md border"
              />
            </div>
          ))}
          <label className="cursor-pointer">
            <div className="flex items-center justify-center border border-dashed bg-gray-100 hover:bg-gray-200 rounded-md h-32 w-full text-gray-600 text-sm">
              + Upload
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                const fs = Array.from(e.target.files);
                setImages((prev) => [...prev, ...fs]);
              }}
            />
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        className="mt-10"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "💾 Save Jewellery"}
      </Button>
    </section>
  );
}
