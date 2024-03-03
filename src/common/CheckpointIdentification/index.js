import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import Modal from "../Modal";
import "./checkpointIdentification.scss";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../store/actions/snackBar";

const CheckpointIdentification = ({
  setShowCheckpointModal,
  parentCallback,
  imageFor = "shops",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [compressedImage, setCompressedImage] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setShowCheckpointModal(false);
  };

  const handleTextChange = e => {
    setText(e.target.value);
  };

  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      parentCallback();
      return;
    }

    if (image) {
      const options = {
        maxSizeMB: 0.5, // (Optional) Maximum file size in MB
        maxWidthOrHeight: 1920, // (Optional) Compressed image's maximum dimension in pixels
        useWebWorker: true, // (Optional) Use a web worker for better performance
        convertToWebp: true, // Convert image to WebP format
      };
      try {
        const compressedFile = await imageCompression(image, options);
        console.log(compressedFile, "manish");
        console.log(image, "manish");

        const formData = new FormData();

        formData.append("file", compressedFile, `${image.name}.webp`);
        formData.append("folderName", imageFor);
        fetch("https://app.glimpass.com/graph/upload", {
          method: "POST",
          body: formData,
        })
          .then(response => response.json())
          .then(data => {
            parentCallback(data);
            dispatch(showSnackbar(data, "success"));

            // You can call parentCallback or perform other actions based on the response
          })
          .catch(error => {
            dispatch(showSnackbar(error, "alert"));
          });

        // 'compressedFile' is a Blob and can be uploaded to S3
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="checkpoint-identification">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text here"
        />
        <input type="file" onChange={handleImageChange} accept="image/*" />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="checkpoint-image"
          />
        )}
        <br />
        <button className="button button--primary" onClick={uploadImage}>
          Proceed
        </button>{" "}
        {/* Add this line */}
      </Modal>
    </div>
  );
};

export default CheckpointIdentification;
