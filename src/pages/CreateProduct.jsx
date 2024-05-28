import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import errorDisplay from "../util/errorDisplay";
export default function CreateProduct() {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  // Hàm submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/admin/create-product`,
        { method: "POST", body: formData, credentials: "include" }
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
      <h1 className="text-3xl font-semibold mb-10 italic">Create Product</h1>
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
              className={`${
                errorDisplay(error, "price") && "transition ease-in bg-red-200"
              } w-full p-2 border rounded`}
              placeholder="Enter Price"
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
              name="count"
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
              className={`${
                errorDisplay(error, "long_desc") &&
                "transition ease-in bg-red-200"
              } w-full p-2 border rounded`}
              placeholder="Enter Long Description"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor=""
              className="block text-xl font-medium text-neutral-500 mb-3"
            >
              Upload image
            </label>
            <p className="text-red-500 text-xs">
              {errorDisplay(error, "image")}
            </p>
            <input type="file" id="image" name="image" className="" multiple />
          </div>
          <button className="py-2 px-3 bg-violet-500 text-white rounded text-lg ">
            Submit
          </button>
        </section>
      </form>
    </main>
  );
}
