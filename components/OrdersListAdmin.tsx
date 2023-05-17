'use client';
import { IOrder } from '@/models/Order'
import React, { useState } from 'react'
import styles from "@/styles/Admin.module.css";

const OrdersListAdmin = ({orders} : {orders: IOrder[]}) => {

  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleStatus = async (id : string, currentStatus: number) => {

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: currentStatus + 1,
          }),
      });

      if(res.ok){
        const data = await res.json();
        setOrderList(prevOrders => {
            const index = prevOrders.findIndex(order => order._id === id);

            return [
                ...prevOrders.slice(0, index),
                data,
                ...prevOrders.slice(index + 1)
            ];
        });
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
                
                <tr key={order._id} className={styles.trTitle}>
                    <td>{order._id.slice(0, 5)}...</td>
                    <td>{order.customer}</td>
                    <td>${order.total}</td>
                    <td>
                    {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                    </td>
                    <td>{status[order.status]}</td>
                    <td>
                    <button className={styles.btnNextStage} onClick={() => handleStatus(order._id, order.status)}>
                        Next Stage
                    </button>
                    </td>
                </tr>
                
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default OrdersListAdmin