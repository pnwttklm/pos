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
  // const [data, setData] = useState<PostalRecords>();

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
    const sender_postal = formData.sender_postal;
    if (sender_postal < 10100 || sender_postal > 96220 || sender_postal % 10 !== 0) {
        alert("Invalid sender postal.");
        return;
    }

    const receiver_postal = formData.receiver_postal;
    if (receiver_postal < 10100 || receiver_postal > 96220 || receiver_postal % 10 !== 0) {
        alert("Invalid receiver postal.");
        return;
    }

    setCount(1);
  };

  const PaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (paymentMethod === "True_wallet") {
      const trueWalletRegex = /^0\d{9}$/;
      if (!trueWalletRegex.test(trueWalletNumber)) {
          alert("Please enter a valid True Wallet number.");
          return;
      }
  }
  

    const trackingNumber = `TN${Date.now()}`; // Example: Auto-generate tracking number
    const price = Math.round(formData.insurance ? formData.receiver_postal > formData.sender_postal ? (formData.receiver_postal-formData.sender_postal)*0.01 *formData.weight+55 : (formData.sender_postal-formData.receiver_postal)*0.01 *formData.weight+55 : formData.receiver_postal > formData.sender_postal ? (formData.receiver_postal-formData.sender_postal)*0.01 *formData.weight+5 : (formData.sender_postal-formData.receiver_postal)*0.01 *formData.weight+5); // Example: Calculate price based on weight

    const newRecord: PostalRecords = {
      ...formData,
      tracking_number: trackingNumber,
      price,
    };

    // setData(newRecord);
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

    alert("Your parcel information is saved.\n\nYour parcel tracking number is " + newRecord.tracking_number);
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
    setCount(0);
  }
  const [count, setCount] = useState(0);


  const [paymentMethod, setPaymentMethod] = useState<string>("credit");
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [trueWalletNumber, setTrueWalletNumber] = useState("");


  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleBankSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBank(e.target.value); // Update selected bank
  };

  return (
    <>
      {count == 0 ? (
        <div className="">
          <h1 className="flex justify-center text-2xl mt-20 underline font-medium">Postal Form</h1>
          <form onSubmit={handleSubmit} className="text-center justify-self-center rounded-lg border-sky-500 mx-20 w-3/5 shadow-xl mb-16 mt-6">
          <br/><br/>
          <label className="">Sender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <br/>
          <label className="underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <br/><br/>
            <div className="mb-2">
              <label className="">Name	&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input className="rounded-lg border-2 border-black-800 mx-20 min-w-48 pl-2"
                type="text"
                name="sender_name"
                value={formData.sender_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="">Surname&nbsp;&nbsp;</label>
              <input className="rounded-lg border-2 border-black-800 mx-20 min-w-48 pl-2"
                type="text"
                name="sender_surname"
                value={formData.sender_surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="">Address&nbsp;&nbsp;</label>
              <input className="rounded-lg border-2 border-black-800 mx-20 min-w-48 pl-2"
                type="text"
                name="sender_address"
                value={formData.sender_address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="">Postal&nbsp;&nbsp;&nbsp;</label>
              <input className="rounded-lg border-2 border-black-800 mx-20 min-w-48 pl-2"
                type="number"
                name="sender_postal"
                value={formData.sender_postal}
                onChange={handleChange}
                required
              />
            </div>
          <br/>
          <label className="">Receiver&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <br/>
          <label className="underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <br/><br/>
            <div className="mb-2">
              <label className="">Name &nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input className="rounded-lg border-2 border-black-800 mx-20 pl-2"
                type="text"
                name="receiver_name"
                value={formData.receiver_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="">Surname&nbsp;&nbsp;</label>
              <input className="rounded-lg border-2 border-black-800 mx-20 pl-2"
                type="text"
                name="receiver_surname"
                value={formData.receiver_surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="">Address&nbsp;&nbsp;</label>
              <input className="rounded-lg border-2 border-black-800 mx-20 pl-2"
                type="text"
                name="receiver_address"
                value={formData.receiver_address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="">Postal&nbsp;&nbsp;&nbsp;</label>
              <input className="rounded-lg border-2 border-black-800 mx-20 pl-2"
                type="number"
                name="receiver_postal"
                value={formData.receiver_postal}
                onChange={handleChange}
                required
              />
            </div>
            <br/>
          <label className="">Parcel&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <br/>
          <label className="underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <br/><br/>
            <div className="mb-2">
              <label className="">Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <select className="rounded-lg border-2 border-black-800 mx-20 pl-2"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Big">Big</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            {formData.type !== "Custom" && (
                  <div>
                  {(() => {
                    formData.weight = formData.type === "Small"? 3 : formData.type === "Medium"? 5: formData.type === "Big"? 10 :0;
                    return <></>;
                  })()}
                </div>
            )}
            {formData.type === "Custom" && (
            <div className="mb-2">
            <label className="">Weight(kg)</label>
            <input className="rounded-lg border-2 border-black-800 mx-20 pl-2"
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
            </div>
            )}
            <div className="">
              <label className="mb-2">
              Insurance&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="rounded-lg border-2 border-black-800 mx-20"
                  type="checkbox"
                  name="insurance"
                  checked={formData.insurance}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit" className="my-8 ring ring-black-500 py-1 px-4 rounded-lg drop-shadow-2xl ">Submit</button>
          </form>
        </div>
      ) : (

        <div>
          <h1 className="flex justify-center text-2xl mt-20 underline font-medium">Choose Payment Method</h1>
          <h1 className="flex justify-center text-2xl mt-20 font-medium">Your price is "{Math.round(formData.insurance ? formData.receiver_postal > formData.sender_postal ? (formData.receiver_postal-formData.sender_postal)*0.01 *formData.weight+55 : (formData.sender_postal-formData.receiver_postal)*0.01 *formData.weight+55 : formData.receiver_postal > formData.sender_postal ? (formData.receiver_postal-formData.sender_postal)*0.01 *formData.weight+5 : (formData.sender_postal-formData.receiver_postal)*0.01 *formData.weight+5)}".</h1>
          <form onSubmit={PaymentSubmit} className="justify-self-center text-center rounded-lg border-sky-500 mx-20 w-3/5 shadow-xl my-16 border border-slate-900">
          <div>
          <label>
            <input className="my-8"
              type="radio"
              name="payment_method"
              value="Mobile_Banking"
              checked={paymentMethod === "Mobile_Banking"}
              onChange={handlePaymentMethodChange}
            />
            &nbsp;Mobile Banking
          </label>
        </div>
        <div>
          <label>
            <input className="my-8"
              type="radio"
              name="payment_method"
              value="True_wallet"
              checked={paymentMethod === "True_wallet"}
              onChange={handlePaymentMethodChange}
            />
            &nbsp;True wallet&nbsp;&nbsp;&nbsp;
          </label>
        </div>
        <div>
          <label>
            <input className="my-8"
              type="radio"
              name="payment_method"
              value="PromptPay"
              checked={paymentMethod === "PromptPay"}
              onChange={handlePaymentMethodChange}
            />
             &nbsp;PromptPay&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
        </div>

        {paymentMethod === "Mobile_Banking" && (
        <div>
          <label className="flex justify-center text-xl underline font-medium mb-8" >Choose Your Bank</label>
          <div className="flex justify-center">
          <label className="flex items-center gap-2">
            <input type="radio" name="Mobile_Banking" value="SCB Easy" checked= {selectedBank === "SCB Easy"} onChange={handleBankSelection}/>
           &nbsp;SCB Easy&nbsp;<img className="" width={40} height={40} src= "/images/352546063_641669357830515_5523115071139787386_n.jpg" alt="scb" />
          </label>
          </div>
          <div className="flex justify-center">
          <label className="mt-1 flex items-center gap-2">
            <input type="radio" name="Mobile_Banking" value="K PLUS" checked= {selectedBank === "K PLUS"} onChange={handleBankSelection}/>
            &nbsp;K PLUS&nbsp;&nbsp;&nbsp;<img className="" width={40} height={40} src= "/images/กสิกรไทย.jpg" alt="K+" />
          </label>
          </div>
          <div className="flex justify-center">
          <label className="mt-1 flex items-center gap-2">
            <input type="radio" name="Mobile_Banking" value="Krungsri" checked= {selectedBank === "Krungsri"} onChange={handleBankSelection}/>
            &nbsp;Krungsri&nbsp;<img className="" width={40} height={40} src= "/images/357098659_658740579630408_6514182495525255873_n.jpg" alt="Krungsri" />
          </label>
          </div>
          <div className="flex justify-center">
          <label className="mt-1 flex items-center gap-2">
            <input type="radio" name="Mobile_Banking" value="Krungthai" checked= {selectedBank === "Krungthai"} onChange={handleBankSelection}/>
            &nbsp;Krungthai<img className="" width={40} height={40} src= "/images/466385281_1015097837324582_112570547143435919_n.jpg" alt="Krungthai" />
          </label>
          </div>
          <div className="flex justify-center">
          <label className="mt-1 flex items-center gap-2"  >
            <input type="radio" name="Mobile_Banking" value="Bangkok" checked= {selectedBank === "Bangkok"} onChange={handleBankSelection}/>
            &nbsp;Bangkok&nbsp;&nbsp;<img className="" width={40} height={40} src= "/images/409774962_841594991309193_8251152104128804819_n.jpg" alt="Bangkok" />
          </label>
          </div>
        </div>
      )}

      {paymentMethod === "True_wallet" && (
        <div>
          <label className="flex justify-center text-xl underline font-medium mb-8" >Input Your True Wallet Phone Number</label>
          <label>True wallet Phone Number</label>
          <input className="text-center rounded-lg border-2 border-black-800 mx-20"
            type="number"
            name={trueWalletNumber}
            onChange={(e) => setTrueWalletNumber(e.target.value)}
            required
          />
        </div>
      )}

      {paymentMethod === "PromptPay" && (
        <div className="flex justify-center">
         <img src= {`https://promptpay.io/0859901616/${Math.round(formData.insurance ? formData.receiver_postal > formData.sender_postal ? (formData.receiver_postal-formData.sender_postal)*0.01 *formData.weight+55 : (formData.sender_postal-formData.receiver_postal)*0.01 *formData.weight+55 : formData.receiver_postal > formData.sender_postal ? (formData.receiver_postal-formData.sender_postal)*0.01 *formData.weight+5 : (formData.sender_postal-formData.receiver_postal)*0.01 *formData.weight+5)}`} alt="PromptPay" />
        </div>
      )}

        <button type="submit" className="my-8 ring ring-black-500 py-1 px-4 rounded-lg drop-shadow-2xl ">Submit</button>
      </form>
    </div>

      )}
    </>
  );
}

