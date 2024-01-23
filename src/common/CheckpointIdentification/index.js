import React, { useState } from "react";
import Modal from "../Modal";
import "./checkpointIdentification.scss";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../store/actions/snackBar";

const CheckpointIdentification = ({
  setShowCheckpointModal,
  parentCallback,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setShowCheckpointModal(false);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const uploadImage = () => {
    if (!image) {
      parentCallback();
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("folderName", "shops");

    fetch("https://app.glimpass.com/graph/upload", {
      method: "POST",

      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        parentCallback(data);
        dispatch(showSnackbar(data, "success"));

        // You can call parentCallback or perform other actions based on the response
      })
      .catch((error) => {
        dispatch(showSnackbar(error, "alert"));
      });
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
        <button onClick={uploadImage}>
          Proceed <small>image is not compulsory</small>
        </button>{" "}
        {/* Add this line */}
      </Modal>
    </div>
  );
};

export default CheckpointIdentification;
