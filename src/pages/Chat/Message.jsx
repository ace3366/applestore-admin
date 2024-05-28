import React from "react";

export default function Message({ message }) {
  //Style
  const styles = {
    customer: "py-2 px-3 text-neutral-500 bg-neutral-200 rounded",
    customerHolder: " mb-6 flex",
    admin: "py-2 px-3 text-neutral-100 bg-sky-400 rounded",
    adminHolder: "self-end mb-6",
  };
  return (
    <>
      {message.userId && message.userId.role === "admin" ? (
        <div className={styles.adminHolder}>
          <span className={styles.admin}>{message.message}</span>
        </div>
      ) : (
        <div className={styles.customerHolder}>
          <img
            className="w-10"
            src={require("../../image/3_avatar-512.png")}
            alt=""
          />
          <span className={styles.customer}>{message.message}</span>
        </div>
      )}
      {message.end && (
        <div className="text-center text-neutral-500 italic">
          Bạn đã kết thúc phiên tư vấn
        </div>
      )}
    </>
  );
}
