import { IProduct } from "@/models/Product";
import styles from "../../../styles/Product.module.css";
import Image from "next/image";
import PizzaForm from "@/components/PizzaForm";

const Product = async ({params : {id}}: {
  params : { id: string}
}) => {
  
  const res = await fetch(`${process.env.HOST}/api/products/${id}`, {
    cache: 'no-cache'
  })
  const pizza : IProduct = await res.json();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} fill style={{objectFit: 'contain'}} alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <p className={styles.desc}>{pizza.desc}</p>

        <PizzaForm pizza={pizza} />
        
      </div>
    </div>
  );
};

export default Product;
