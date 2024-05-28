import React from "react";
import priceConverter from "../../util/priceConverter";
import { Link } from "react-router-dom";
export default function Order({ id, userId, name, phone, address, total }) {
  return (
    <>
      {id && (
        <tr className="odd:bg-slate-100 text-neutral-600">
          <td className="border px-2 w-1/12">{userId}</td>
          <td className="border px-2  w-1/12 ">{name}</td>
          <td className="border px-2 w-1/12">{phone}</td>
          <td className="border py-5 px-2 text-center w-2/12">{address}</td>
          <td className="border px-2 w-2/12">{priceConverter(total)}</td>
          <td className="border px-2  w-2/12">Chưa vận chuyển</td>
          <td className="border px-2  w-2/12">Chưa thanh toán</td>
          <td className="border px-2  w-1/12 text-center">
            <Link
              to={`/order/${id}`}
              className="p-2 rounded hover:bg-green-500 bg-green-600 text-white mb-2"
            >
              View
            </Link>
          </td>
        </tr>
      )}
    </>
  );
}
