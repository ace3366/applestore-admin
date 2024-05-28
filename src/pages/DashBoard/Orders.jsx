import React, { useEffect, useState } from "react";
import Order from "./Order";
export default function () {
  const [orders, setOrders] = useState([]);
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/admin/get-orders`
        );
        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">History</h3>
      <table className=" border-collapse rounded">
        <thead>
          <tr className="text-left">
            <th className="border px-2 py-3">ID User</th>
            <th className="border px-2 py-3">Name</th>
            <th className="border px-2 py-3">Phone</th>
            <th className="border px-2 py-3">Address</th>
            <th className="border px-2 py-3">Total</th>
            <th className="border px-2 py-3">Delivery</th>
            <th className="border px-2 py-3">Status</th>
            <th className="border px-2 py-3">Detail</th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {orders.map((order) => (
            <Order
              key={order._id}
              id={order._id}
              userId={order.userId}
              name={order.fullName}
              phone={order.phone}
              address={order.address}
              total={order.cart.totalPrice}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
