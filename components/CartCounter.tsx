'use client';

import styles from "../styles/Navbar.module.css";
import { useSelector } from 'react-redux'
import { RootState } from "@/redux/store";

const CartCounter = () => {

  const quantity = useSelector((state: RootState) => state.cart.quantity);

  return (
    <div className={styles.counter}>{quantity}</div>
  )
}

export default CartCounter