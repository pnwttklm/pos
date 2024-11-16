"use client";
import React from "react";

export default function footer() {
  const year = new Date().getFullYear();
  return (
  <footer className="bg-red-600 text-white py-8">
    <div className="text-center mt-4">
      <p>© 2024 Thai Post Office. All Rights Reserved.</p>
    </div>
  </footer>
  );
}