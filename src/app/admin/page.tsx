export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/data`);
  const { data } = await res.json();

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

  return (
    <main>
      <h1>Database Data</h1>
      <table>
        <thead>
          <tr>
            <th>Tracking Number</th>
            <th>Sender Name</th>
            <th>Sender Surname</th>
            <th>Sender Address</th>
            <th>Sender Postal</th>
            <th>Receiver Name</th>
            <th>Receiver Surname</th>
            <th>Receiver Address</th>
            <th>Receiver Postal</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Type</th>
            <th>Insurance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: PostalRecords, index: number) => (
            <tr key={index}>
              <td>{row.tracking_number}</td>
              <td>{row.sender_name}</td>
              <td>{row.sender_surname}</td>
              <td>{row.sender_address}</td>
              <td>{row.sender_postal}</td>
              <td>{row.receiver_name}</td>
              <td>{row.receiver_surname}</td>
              <td>{row.receiver_address}</td>
              <td>{row.receiver_postal}</td>
              <td>{row.weight}</td>
              <td>{row.price}</td>
              <td>{row.type}</td>
              <td>{row.insurance ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}