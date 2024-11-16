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
    <div style={{ padding: "20px" }}>
      <h1>Envelope Generator</h1>
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter Tracking Number"
        style={{ padding: "10px", margin: "10px 0", width: "100%" }}
      />
      <button onClick={handleGeneratePDF} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Envelope PDF"}
      </button>
    </div>
  );
};

export default EnvelopePage;