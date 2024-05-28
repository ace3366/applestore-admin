import React from "react";
import { Link } from "react-router-dom";
import priceConverter from "../../util/priceConverter";

export default function Product({
  id,
  name,
  image,
  price,
  category,
  openModal,
}) {
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
                openModal(id);
              }}
              // onClick={() => {
              //   dispatch(modalAction.modalToggle());
              // }}
              className="p-2 rounded hover:bg-red-500 bg-red-600 ml-2 text-white"
            >
              Delete
            </button>
          </td>
        </tr>
      )}
    </>
  );
}
