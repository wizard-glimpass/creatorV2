import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const uploadToS3 = async (file) => {
    try {
      // Get the pre-signed URL from your backend
      const response = await axios.get(
        "/your-backend-endpoint-for-presigned-url"
      );
      const presignedUrl = response.data.url;

      // Upload the image to S3
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": "image/jpeg",
        },
      });

      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (image) {
      uploadToS3(image);
    } else {
      alert("No image selected");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCapture}
        />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
}

export default ImageUpload;
