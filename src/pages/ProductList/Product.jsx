import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalAction } from "../../store/modal";
import priceConverter from "../../util/priceConverter";
import Modal from "../../components/UI/Modal";

export default function Product({
  id,
  name,
  image,
  price,
  category,
  reRender,
}) {
  const dispatch = useDispatch();
  // Hàm xoá product
  const deleteProduct = async () => {
    try {
      reRender();
      const response = await fetch(
        `${process.env.REACT_APP_API}/admin/delete-product/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Can not fetch data");
      const result = await response.json();
      console.log(result);
      dispatch(modalAction.modalToggle());
      reRender();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {id && (
        <tr className="odd:bg-slate-100">
          <td className="border px-2 w-1/12">{id}</td>
          <td className="border px-2  w-3/12 ">{name}</td>
          <td className="border px-2 w-2/12">{priceConverter(price)}</td>
          <td className="border py-5 px-2 w-2/12">
            <img src={image} className="w-24" alt="" />
          </td>
          <td className="border px-2  w-1/12">{category}</td>
          <td className="border px-2  w-2/12 text-center">
            <Link
              to={`/edit/${id}`}
              className="inline-block p-2 rounded hover:bg-green-500 bg-green-600 text-white mb-2"
            >
              Update
            </Link>
            <button
              onClick={() => {
                dispatch(modalAction.modalToggle());
              }}
              className="p-2 rounded hover:bg-red-500 bg-red-600 ml-2 text-white"
            >
              Delete
            </button>
          </td>
        </tr>
      )}
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
