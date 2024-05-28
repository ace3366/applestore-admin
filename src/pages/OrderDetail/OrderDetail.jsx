import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import priceConverter from "../../util/priceConverter.js";
import DetailTable from "./DetailTable";
export default function OrderDetail() {
  const styles = {
    td: "font-medium text-neutral-600 py-4 px-3 border",
  };
  const [order, setOrder] = useState({});
  const { orderId } = useParams();
  console.log(order);
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/get-order/${orderId}`
        );
        const data = await response.json();
        setOrder(data.order);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-10 w-full mr-10 ml-10">
      <h1 className="text-3xl italic ">INFORMATION ORDER</h1>
      <div className="italic text-neutral-500 mt-3 mb-16">
        <p>ID User : {order.userId}</p>
        <p>Full Name : {order.fullName}</p>
        <p>Phone : {order.phone}</p>
        <p>Address : {order.address}</p>
        <p>Total : {priceConverter(order.cart && order.cart.totalPrice)}</p>
      </div>

      {/* Phần thông tin order */}
      <div className="italic basis-2/3">
        <table className=" w-full mb-12">
          {/* Phần tiêu đề hiển thị */}
          <thead>
            <tr className="bg-neutral-100">
              <th className={styles.td}>ID PRODUCT</th>
              <th className={styles.td}>IMAGE</th>
              <th className={styles.td}>NAME</th>
              <th className={styles.td}>PRICE</th>
              <th className={styles.td}>COUNT</th>
            </tr>
          </thead>
          {/* Phần order table */}
          <tbody>
            {order.cart &&
              order.cart.products.map((product) => (
                <DetailTable
                  id={product.productId._id}
                  image={product.productId.img1}
                  name={product.productId.name}
                  price={product.productId.price}
                  count={product.quantity}
                ></DetailTable>
              ))}
          </tbody>
        </table>

        {/* In 1 câu thông báo nếu giỏ hàng đang trống */}
        {/* {totalProduct.length === 0 && (
          <p className="text-center mb-12 italic text-lg text-neutral-500">
            Giỏ hàng hiện đang trống
          </p>
        )} */}
      </div>
    </div>
  );
}
