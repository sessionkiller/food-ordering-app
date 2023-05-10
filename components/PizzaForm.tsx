'use client'
import React, { useState } from 'react'
import styles from "../styles/Product.module.css";
import Image from 'next/image';
import { IProduct } from '@/models/Product';
import { useDispatch } from 'react-redux'
import { addProduct } from '@/redux/cartSlice';

type Extra = {
    text: string
    price: number
    _id?: string
}

const PizzaForm = ({pizza} : {pizza : IProduct}) => {

  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState<Extra[]>([]);
  const dispatch = useDispatch();

  const handleSize = (sizeIndex : number) => {

    const diff = pizza.prices[sizeIndex] - pizza.prices[size];
    changePrice(diff);
    setSize(sizeIndex)
  }

  const changePrice = (diff : number) => {
    setPrice(prevPrice => prevPrice + diff);
  }

  const handleExtra = (e : React.ChangeEvent<HTMLInputElement>, option : Extra) => {
    const {checked} = e.target;

    const diff = checked ? option.price : -option.price;

    changePrice(diff);
    if(checked){
        setExtras(prev => [...prev, option])
    }else{
        setExtras(prev => prev.filter(extra => extra._id !== option._id))
    }
  }

  const handleClick = () => {
    dispatch(addProduct({
        ...pizza,
        price,
        quantity,
        extras,
        lineId: Date.now()
    }))
  }
  
  return (
    <>
        <span className={styles.price}>${price}</span>
        
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" fill alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" fill alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" fill alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
            {pizza.extraOptions.map((option : Extra) => (
                <div className={styles.option} key={option._id}>
                    <input
                        type="checkbox"
                        id={option.text}
                        name={option.text}
                        className={styles.checkbox}
                        onChange={e => handleExtra(e, option)}
                    />
                    <label htmlFor={option.text}>{option.text}</label>
                </div>
            ))}
          
          
        </div>
        <div className={styles.add}>
            <input type="number" min={1} value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} className={styles.quantity}/>
            <button className={styles.button} onClick={handleClick}>Add to Cart</button>
        </div>
    </>
  )
}

export default PizzaForm