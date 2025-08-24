import React, { useState } from "react";
import Button from "@mui/material/Button";
import { MdOutlineFileUpload } from "react-icons/md";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import toast from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";

export default function AddGemCat() {
  const [productCat, setProductCat] = useState('');
  const [subCatName, setSubCatName] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // get token

  const handleChangeProductCat = (event) => setProductCat(event.target.value);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      toast.error("You can only upload up to 5 images.");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previewImages];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  const handleSubmit = async () => {
    if (!productCat || !subCatName || images.length === 0) {
      toast.error("Please fill all fields and upload at least one image.");
      return;
    }

    if (!token) {
      toast.error("You must be logged in to perform this action.");
      return;
    }

    setLoading(true);

    try {
      // ---------------- Upload Images ----------------
      const formData = new FormData();
      images.forEach((image) => formData.append("images", image));

      const uploadRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/gemCat/uploadImages`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // <--- attach token
          },
        }
      );

      if (!uploadRes.data.success) throw new Error("Image upload failed");

      // ---------------- Create Category ----------------
      const createRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/gemCat/create`,
        {
          catName: productCat,
          name: subCatName,
          images: uploadRes.data.images, // send uploaded image URLs if backend returns them
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // <--- attach token
          },
        }
      );

      if (createRes.data.success) {
        toast.success("Category created successfully!");
        setProductCat('');
        setSubCatName('');
        setImages([]);
        setPreviewImages([]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || error.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-gray-50">
      <form
        className="form py-3 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gem Category */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Gem Category
            </label>
            <Select size="small" fullWidth value={productCat} onChange={handleChangeProductCat}>
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="Precious">Precious</MenuItem>
              <MenuItem value="Semi Precious">Semi Precious</MenuItem>
            </Select>
          </div>

          {/* Sub Category Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Sub Category Name
            </label>
            <input
              type="text"
              value={subCatName}
              onChange={(e) => setSubCatName(e.target.value)}
              className="w-full h-[40px] border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Ruby, Sapphire"
            />
          </div>

          {/* Upload Box */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Upload Images</label>
            <div className="grid grid-cols-3 gap-2">
              {previewImages.map((img, index) => (
                <div className="uploadBoxWrapper relative" key={index}>
                  <span
                    onClick={() => removeImage(index)}
                    className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                  >
                    <IoCloseOutline className="text-white text-[17px]" />
                  </span>
                  <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.5)] h-[90px] w-[100%] bg-gray-100 flex items-center justify-center flex-col relative">
                    <img className="w-full h-full object-cover" alt="preview" src={img} />
                  </div>
                </div>
              ))}

              <label className="uploadBoxWrapper cursor-pointer">
                <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.5)] h-[90px] w-[100%] bg-gray-100 flex items-center justify-center flex-col relative hover:bg-gray-200">
                  <span className="text-sm text-gray-600">+ Upload</span>
                  <input type="file" accept="image/*" multiple hidden onChange={handleImageChange} />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 w-full md:w-[250px]">
          <Button
            type="submit"
            className="btn-blue btn-lg w-full flex gap-2"
            disabled={loading}
            variant="contained"
            color="primary"
          >
            <MdOutlineFileUpload className="text-[22px]" />
            {loading ? "Publishing..." : "Publish & View"}
          </Button>
        </div>
      </form>
    </section>
  );
}
