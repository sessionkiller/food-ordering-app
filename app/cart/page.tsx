'use client';
import { RootState } from "@/redux/store";
import styles from "../../styles/Cart.module.css";
import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux'

const Cart = () => {
  const products = useSelector((state : RootState) => state.cart.products);
  const total = useSelector((state : RootState) => state.cart.total);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.lineId} className={styles.tr}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      fill
                      style={{objectFit: 'cover'}}
                      alt={product.title}
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra: any) => extra.text).join(', ')}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>${product.price * product.quantity}</span>
                </td>
              </tr>
            ))}
            {/* <tr className={styles.tr}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src="/img/pizza.png"
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>CORALZO</span>
              </td>
              <td>
                <span className={styles.extras}>
                  Double ingredient, spicy sauce
                </span>
              </td>
              <td>
                <span className={styles.price}>$19.90</span>
              </td>
              <td>
                <span className={styles.quantity}>2</span>
              </td>
              <td>
                <span className={styles.total}>$39.80</span>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${total}
          </div>
          <button className={styles.button}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
