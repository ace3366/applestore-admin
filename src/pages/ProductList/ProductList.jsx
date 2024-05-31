import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { modalAction } from "../../store/modal";
import { useDebounce } from "../../hooks/useDebound";
import Modal from "../../components/UI/Modal";
import Product from "./Product";
export default function ProductList() {
  const [idToDelete, setIdToDelete] = useState("");
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const debouncedKeyword = useDebounce(keyword, 500);
  const dispatch = useDispatch();
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
  // Gọi modal ra kèm theo id cần xoá
  const callOpenModal = (id) => {
    setIdToDelete(id);
    dispatch(modalAction.modalToggle());
  };

  // Hàm xoá product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/admin/delete-product/${idToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Can not fetch data");
      const result = await response.json();

      dispatch(modalAction.modalToggle());
      sendToServer(debouncedKeyword);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
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
                openModal={callOpenModal}
              />
            ))}
          </tbody>
        </table>
      </main>

      <Modal>
        <div className="pt-10 px-10 pb-8 text-center">
          <h2 className="font-medium text-xl">
            Are you sure to delete this product?
          </h2>
          <div className="flex justify-between mt-8 px-16">
            <button
              onClick={deleteProduct}
              className="py-2 px-4 text-xl rounded hover:bg-green-500 bg-green-600 ml-2 text-white"
            >
              Yes
            </button>
            <button
              onClick={() => {
                dispatch(modalAction.modalToggle());
              }}
              className="py-2 px-4 text-xl rounded hover:bg-red-500 bg-red-600 ml-2 text-white"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
