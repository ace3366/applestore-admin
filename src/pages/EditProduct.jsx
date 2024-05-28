import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import errorDisplay from "../util/errorDisplay";
export default function CreateProduct() {
  const id = useParams().productId;
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [form, setForm] = useState({});

  // Fetch data từ server
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/admin/get-product/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Can not fetch data");
        }
        const result = await response.json();
        setForm(result.product);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, []);

  // Hàm thay đổi giá trị hiển thị trên input
  const changeInput = (event, key) => {
    setForm((prevState) => {
      return { ...prevState, [key]: event.target.value };
    });
  };

  // Hàm submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/admin/edit-product/${id}`,
        { method: "PATCH", body: formData, credentials: "include" }
      );
      if (!response.ok) {
        const resData = await response.json();
        setError(resData);
      } else {
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="container w-full pt-10">
      <h1 className="text-3xl font-semibold mb-10 italic">Update Product</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-11/12 rounded bg-slate-100 mb-10"
      >
        <section className="p-5">
          <div className="mb-6">
            <label
              htmlFor=""
              className="block text-xl font-medium text-neutral-500 mb-3"
            >
              Product Name
            </label>
            <p className="text-red-500 text-xs">
              {errorDisplay(error, "name")}
            </p>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(event) => changeInput(event, "name")}
              className={`${
                errorDisplay(error, "name") && "transition ease-in bg-red-200"
              } w-full p-2 border rounded`}
              placeholder="Enter Product Name"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor=""
              className="block text-xl font-medium text-neutral-500 mb-3"
            >
              Category
            </label>
            <p className="text-red-500 text-xs">
              {errorDisplay(error, "category")}
            </p>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={(event) => changeInput(event, "category")}
              className={`${
                errorDisplay(error, "category") &&
                "transition ease-in bg-red-200"
              } w-full p-2 border rounded`}
              placeholder="Enter Category"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor=""
              className="block text-xl font-medium text-neutral-500 mb-3"
            >
              Price ( VND )
            </label>
            <p className="text-red-500 text-xs">
              {errorDisplay(error, "price")}
            </p>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={(event) => changeInput(event, "price")}
              className={`${
                errorDisplay(error, "price") && "transition ease-in bg-red-200"
              } w-full p-2 border rounded`}
              placeholder="Enter Category"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor=""
              className="block text-xl font-medium text-neutral-500 mb-3"
            >
              Count
            </label>
            <p className="text-red-500 text-xs">
              {errorDisplay(error, "count")}
            </p>
            <input
              type="number"
              onChange={(event) => changeInput(event, "count")}
              name="count"
              value={form.count}
              className={`${
                errorDisplay(error, "count") && "transition ease-in bg-red-200"
              } w-full p-2 border rounded`}
              placeholder="Enter Count"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor=""
              className="block text-xl font-medium text-neutral-500 mb-3"
            >
              Short Description
            </label>
            <p className="text-red-500 text-xs">
              {errorDisplay(error, "short_desc")}
            </p>
            <textarea
              type="text"
              name="short_desc"
              rows="5"
              value={form.short_desc}
              onChange={(event) => changeInput(event, "short_desc")}
              className={`${
                errorDisplay(error, "short_desc") &&
                "transition ease-in bg-red-200"
              } w-full p-2 border rounded`}
              placeholder="Enter Short Description"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor=""
              className="block text-xl font-medium text-neutral-500 mb-3"
            >
              Long Description
            </label>
            <p className="text-red-500 text-xs">
              {errorDisplay(error, "long_desc")}
            </p>
            <textarea
              type="text"
              name="long_desc"
              rows="10"
              value={form.long_desc}
              onChange={(event) => changeInput(event, "long_desc")}
              className={`${
                errorDisplay(error, "long_desc") &&
                "transition ease-in bg-red-200"
              } w-full p-2 border rounded`}
              placeholder="Enter Long Description"
            />
          </div>

          <button className="py-2 px-3 bg-violet-500 text-white rounded text-lg ">
            Submit
          </button>
        </section>
      </form>
    </main>
  );
}
