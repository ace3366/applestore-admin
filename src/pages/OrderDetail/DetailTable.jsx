import React from "react";
import priceConverter from "../../util/priceConverter";

export default function DetailTable({ id, image, name, price, count }) {
  return (
    <>
      {id && (
        <tr className="text-left border-collapse text-neutral-500">
          <td className="border py-5 px-2">{id}</td>
          <td className="border py-5 px-2 w-2/12">
            <img src={image} className="w-40" alt="" />
          </td>
          <td className="border py-5 px-2">{name}</td>
          <td className="border py-5 px-2">{priceConverter(price)}</td>
          <td className="border py-5 px-2">{count}</td>
        </tr>
      )}
    </>
  );
}
