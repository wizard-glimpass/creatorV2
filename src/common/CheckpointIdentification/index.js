import React, { useState } from "react";
import Modal from "../Modal";
import "./checkpointIdentification.scss";

const CheckpointIdentification = ({ setShowCheckpointModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

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
      setImage(URL.createObjectURL(e.target.files[0]));
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
          <img src={image} alt="Uploaded" className="checkpoint-image" />
        )}
      </Modal>
    </div>
  );
};

export default CheckpointIdentification;
