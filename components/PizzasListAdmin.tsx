'use client';
import { IProduct } from '@/models/Product'
import React, { useState } from 'react'
import styles from "@/styles/Admin.module.css";
import Image from 'next/image';

const PizzasListAdmin = ({ products} : {products : IProduct[]}) => {
  const [pizzaList, setPizzaList] = useState(products);

  const handleDelete = async (id : string) => {
    console.log(id);
    try {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE"
          });

        if(res.ok) setPizzaList(prevList => prevList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pizzaList.map((product) => (
                
                <tr key={product._id} className={styles.trTitle}>
                    <td>
                    <Image
                        src={product.img}
                        width={50}
                        height={50}
                        style={{objectFit: 'cover'}}
                        alt=""
                    />
                    </td>
                    <td>{product._id.slice(0, 5)}...</td>
                    <td>{product.title}</td>
                    <td>${product.prices[0]}</td>
                    <td>
                    <button className={styles.button}>Edit</button>
                    <button
                        className={styles.button}
                        onClick={() => handleDelete(product._id)}
                    >
                        Delete
                    </button>
                    </td>
                </tr>
                
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default PizzasListAdmin