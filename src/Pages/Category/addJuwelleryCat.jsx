import React, { useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoCloseOutline } from "react-icons/io5";
import Button from "@mui/material/Button";
import { MdOutlineFileUpload } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddJuwellerryCat() {
  const [catName, setCatName] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle image file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Remove image from preview list
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!catName || images.length === 0) {
      alert("Please enter a category name and upload at least one image.");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Upload images to backend
      const formData = new FormData();
      images.forEach(img => formData.append("images", img));

      const uploadRes = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/jewelleryCat/uploadImages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const uploadedImages = uploadRes.data.images;

      // Step 2: Create the category
      const createRes = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/jewelleryCat/create",
        {
          catName,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Category created successfully!");
      // Clear form
      setCatName("");
      setImages([]);
      setPreviewImages([]);
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-5 bg-gray-50">
      <form
        className="form py-3 p-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[25%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">Category Name</h3>
              <input
                type="text"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="w-full h-[40px] border-2 border-[rgba(0,0,0,0.5)] focus:outline-none focus:border-primary rounded-sm p-3 text-sm"
              />
            </div>
          </div>

          <br />

          <h3 className="text-[18px] font-[500] mb-1 text-black">Category Image</h3>

          <br />

          <div className="grid grid-cols-7 gap-4">
            {previewImages.map((img, index) => (
              <div className="uploadBoxWrapper relative" key={index}>
                <span
                  onClick={() => handleRemoveImage(index)}
                  className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                >
                  <IoCloseOutline className="text-white text-[17px]" />
                </span>

                <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.5)] h-[150px] w-[100%] bg-gray-100 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    effect="blur"
                    alt={"preview"}
                    src={img}
                  />
                </div>
              </div>
            ))}

            <label className="uploadBoxWrapper cursor-pointer">
              <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.5)] h-[150px] w-[100%] bg-gray-100 flex items-center justify-center flex-col relative hover:bg-gray-200">
                <span className="text-sm text-gray-600">+ Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleFileChange}
                />
              </div>
            </label>
          </div>
        </div>

        <br />
        <br />

        <div className="w-[250px]">
          <Button
            type="submit"
            className="btn-blue btn-lg w-full flex gap-2"
            disabled={loading}
          >
            <MdOutlineFileUpload className="text-[25px] text-white" />
            {loading ? "Uploading..." : "Publish & View"}
          </Button>
        </div>
      </form>
    </section>
  );
}
