"use client";
import React, { useState } from "react";

const EnvelopePage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePDF = async () => {
    if (!trackingNumber) {
      alert("Please enter a tracking number.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/envelope`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "envelope.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the envelope PDF.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }} className="justify-self-center text-center rounded-lg border-sky-500 mx-20 w-3/5 shadow-xl my-16">
      <h1 className="text-left">Envelope Generator</h1>
      <input className ="text-center rounded-lg border-2 border-black-800 mx-20"
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter Tracking Number"
        style={{ padding: "10px", margin: "10px 0", width: "100%" }}
      />
      <button onClick={handleGeneratePDF} disabled={isLoading}  className="my-8 ring ring-black-500 py-1 px-4 rounded-lg drop-shadow-2xl ">
        {isLoading ? "Generating..." : "Generate Envelope PDF"}
      </button>
    </div>
  );
};

export default EnvelopePage;