"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/data?skip=0&limit=10");
        setData(response.data);
      } catch (error) {
        console.error("Error during fetching", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex  justify-center h-screen p-24 gap-3 ">

      {
        data && data.map((item: any, index) => (
          <div className="flex flex-col gap-2 w-[240px] h-[240px] border border-white ronuded-lg " key={index}>
            <div className="w-[200px] h-[200px] relative rounded-md m-2">
              <Image src={item.Image} alt="Dev Image" fill={true} className="absolute object-contain" />
            </div>
            <div className="text-center"><p>{item.Name}</p></div>
            <div className="flex justify-center gap-3 m-3">
              <p className="">{item.Occupation}</p>
              <p className="">{item.Age}</p>
            </div>
          </div>
        ))
      }


    </main>
  );
}
