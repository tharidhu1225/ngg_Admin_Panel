import React, { useState } from "react";
import { FaRegImages } from "react-icons/fa";

export default function UploadBox(props) {
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Preview images
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);

    // Pass files to parent
    if (props.onChange) {
      props.onChange(files);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.5)] h-[150px] w-[170px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
        <FaRegImages className="text-[40px] opacity-35" />
        <h4 className="text-[14px] pointer-events-none text-center">Image Upload</h4>
        <input
          type="file"
          accept="image/*"
          multiple={props.multiple ?? false}
          className="absolute top-0 left-0 w-full h-full z-50 opacity-0"
          onChange={handleImageChange}
        />
      </div>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {previewImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="preview"
              className="w-[80px] h-[80px] object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
}
