export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tracking`);
  const { data } = await res.json();

  interface Tracking {
    tracking_number: string;
    location: string;
  }

  return (
    <main>
      <h1>Tracking Data</h1>
      <table>
        <thead>
          <tr>
            <th>Tracking Number</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row: Tracking, index: number) => (
            <tr key={index}>
              <td>{row.tracking_number}</td>
              <td>{row.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}