import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = ({ onScan }) => {
  const [data, setData] = useState("No QR code detected");
  const [facingMode, setFacingMode] = useState("environment"); // Default to back camera

  // Function to handle the successful scanning of a QR code
  const handleScan = result => {
    if (result) {
      setData(result?.text);
      onScan(result?.text); // You can lift the state up or handle the result here
    }
  };
  const toggleFacingMode = () => {
    setFacingMode(prevMode =>
      prevMode === "environment" ? "user" : "environment"
    );
  };

  // Function to handle errors
  const handleError = error => {
    console.error(error);
  };

  return (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result);
          }
          if (!!error) {
            handleError(error);
          }
        }}
        constraints={{ facingMode }} // Use the current facing mode
        style={{ width: "100%" }}
      />
      <p>{data}</p>
      <button onClick={toggleFacingMode}>Toggle Camera</button>{" "}
      {/* Button to toggle the camera */}
    </div>
  );
};

export default QRScanner;
