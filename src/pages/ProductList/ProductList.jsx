import React, { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebound";
import Product from "./Product";
export default function ProductList() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const debouncedKeyword = useDebounce(keyword, 500);

  //When ever useDebounce return a value, send it to server
  useEffect(() => {
    sendToServer(debouncedKeyword);
  }, [debouncedKeyword]);

  //Function that Send request to server
  const sendToServer = async (keyword) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/admin/get-products?query=${keyword}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Can not fetch data");
      const result = await response.json();
      setProducts(result.products);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(products);
  return (
    <main className="w-full px-2 mt-10 mb-10">
      {/* Search section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold">Products</h3>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-neutral-400 w-80 p-1"
        />
      </section>
      {/* Table section */}
      <table className=" border-collapse">
        <thead>
          <tr className="text-left">
            <th className="border px-2 py-3">ID</th>
            <th className="border px-2 py-3">Name</th>
            <th className="border px-2 py-3">Price</th>
            <th className="border px-2 py-3">Image</th>
            <th className="border px-2 py-3">Category</th>
            <th className="border px-2 py-3">Edit</th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {products.map((product) => (
            <Product
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.img1}
              category={product.category}
              reRender={() => sendToServer(debouncedKeyword)}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
