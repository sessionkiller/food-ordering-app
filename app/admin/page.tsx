import React from 'react'
import styles from "@/styles/Admin.module.css";
import PizzasListAdmin from '@/components/PizzasListAdmin';
import OrdersListAdmin from '@/components/OrdersListAdmin';
import { IProduct } from '@/models/Product';
import { IOrder } from '@/models/Order';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Page = async () => {

  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  if (token?.value !== process.env.TOKEN) {
    redirect('/admin/login');
  }

  const [products, orders] = await Promise.all<[Promise<IProduct[]>, Promise<IOrder[]>]>([
    fetch(`${process.env.HOST}/api/products`, {
      cache: 'no-cache'
    }).then(res => res.json()),
    fetch(`${process.env.HOST}/api/orders`, {
      cache: 'no-cache'
    }).then(res => res.json())
  ]);

  return (
    <div className={styles.container}>
      <PizzasListAdmin products={products} />
      <OrdersListAdmin orders={orders} />
    </div>
  )
}

export default Page