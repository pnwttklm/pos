"use client";
import { useState } from "react";

interface PostalRecords {
  tracking_number: string;
  sender_name: string;
  sender_surname: string;
  sender_address: string;
  sender_postal: number;
  receiver_name: string;
  receiver_surname: string;
  receiver_address: string;
  receiver_postal: number;
  weight: number;
  price: number;
  type: string;
  insurance: boolean;
}

export default function Home() {
  const [formData, setFormData] = useState<
    Omit<PostalRecords, "tracking_number" | "price">
  >({
    sender_name: "",
    sender_surname: "",
    sender_address: "",
    sender_postal: 0,
    receiver_name: "",
    receiver_surname: "",
    receiver_address: "",
    receiver_postal: 0,
    weight: 0,
    type: "",
    insurance: false,
  });
  const [data, setData] = useState<PostalRecords[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trackingNumber = `TN${Date.now()}`; // Example: Auto-generate tracking number
    const price = formData.weight * 5; // Example: Calculate price based on weight

    const newRecord: PostalRecords = {
      ...formData,
      tracking_number: trackingNumber,
      price,
    };

    setData((prev) => [...prev, newRecord]);
    setFormData({
      sender_name: "",
      sender_surname: "",
      sender_address: "",
      sender_postal: 0,
      receiver_name: "",
      receiver_surname: "",
      receiver_address: "",
      receiver_postal: 0,
      weight: 0,
      type: "",
      insurance: false,
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecord),
      });

      if (!response.ok) {
      throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("There was an error submitting the form. Please try again.");
      return;
    }

    setCount(1);
  };
  const [count, setCount] = useState(0);

  return (
    <>
      {count == 0 ? (
        <div>
          <h1>Postal Form</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Sender Name</label>
              <input
                type="text"
                name="sender_name"
                value={formData.sender_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Sender Surname</label>
              <input
                type="text"
                name="sender_surname"
                value={formData.sender_surname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Sender Address</label>
              <input
                type="text"
                name="sender_address"
                value={formData.sender_address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Sender Postal</label>
              <input
                type="number"
                name="sender_postal"
                value={formData.sender_postal}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Receiver Name</label>
              <input
                type="text"
                name="receiver_name"
                value={formData.receiver_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Receiver Surname</label>
              <input
                type="text"
                name="receiver_surname"
                value={formData.receiver_surname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Receiver Address</label>
              <input
                type="text"
                name="receiver_address"
                value={formData.receiver_address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Receiver Postal</label>
              <input
                type="number"
                name="receiver_postal"
                value={formData.receiver_postal}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="parcel">Parcel</option>
                <option value="letter">Letter</option>
              </select>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="insurance"
                  checked={formData.insurance}
                  onChange={handleChange}
                />
                Insurance
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>

          <h2>Records</h2>
          <ul>
            {data.map((record, index) => (
              <li key={index}>
                {record.tracking_number}: {record.sender_name} to{" "}
                {record.receiver_name} (${record.price})<br />
                Sender Postal: {record.sender_postal}
                <br />
                Reciver Postal: {record.receiver_postal}
                <br />
                Weight:{record.weight}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
        <h1>
          Here is page 2</h1></>
      )}
    </>
  );
}
