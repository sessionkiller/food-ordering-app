import { IOrder } from '@/models/Order'
import React, { useState } from 'react'
import styles from "@/styles/OrderDetail.module.css";

const OrderDetail = ({total, createOrder, setCash} : {
  total: number, 
  createOrder: (data: Partial<IOrder>) => void,
  setCash: (value: boolean) => void
}) => {

  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOrder({ customer, address, total, method: 0 });
  };

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <button type='button' className={styles.close} onClick={() => setCash(false)}>X</button>
        <h1 className={styles.title}>You will pay ${total} after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Full Name</label>
          <input
            placeholder="John Doe"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type='submit' className={styles.button}>
          Order
        </button>
      </form>
    </div>
  );
}

export default OrderDetail