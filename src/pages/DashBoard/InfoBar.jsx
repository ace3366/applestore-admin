import React, { useEffect, useState } from "react";
import priceConverter from "../../util/priceConverter";

export default function InfoBar() {
  // Fetch data from API
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/admin/get-info-board`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="rounded flex justify-between border shadow-sm">
      {/* Display total user */}
      <div className="flex justify-between p-4 basis-1/3 border-r  items-center">
        <div>
          <p className="text-2xl font-bold">{data.userCount}</p>
          <p className="font-medium text-neutral-400 text-sm">Clients</p>
        </div>
        <i className="fa-solid fa-user-plus text-neutral-400"></i>
      </div>
      {/* Display total profit */}
      <div className="flex justify-between p-4 basis-1/3 border-r items-center">
        <div>
          {" "}
          <p className="text-2xl font-bold">{priceConverter(data.profit)}</p>
          <p className="font-medium text-neutral-400 text-sm">
            Earning of Month
          </p>{" "}
        </div>
        <i className="fa-solid fa-dollar-sign text-neutral-400"></i>
      </div>
      {/* Display total order */}
      <div className="flex justify-between p-4 basis-1/3  items-center">
        <div>
          <p className="text-2xl font-bold">{data.orderCount}</p>
          <p className="font-medium text-neutral-400 text-sm">New Order</p>
        </div>
        <i className="fa-regular fa-square-plus text-neutral-400"></i>
      </div>
    </div>
  );
}
