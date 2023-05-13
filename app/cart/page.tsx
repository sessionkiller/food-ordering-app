'use client';
import { RootState } from "@/redux/store";
import styles from "../../styles/Cart.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { IOrder } from "@/models/Order";
import { reset } from "@/redux/cartSlice";

const ButtonWrapper = ({ currency, amount, style, showSpinner, createOrder } : {
  currency : string,
  amount: number,
  style: any,
  showSpinner : boolean,
  createOrder: (data: Partial<IOrder>) => void
}) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
      dispatch({
          type: "resetOptions",
          value: {
              ...options,
              currency: currency,
          },
      });
  }, [currency, showSpinner]);


  return (<>
          { (showSpinner && isPending) && <div className="spinner" /> }
          <PayPalButtons
              style={style}
              disabled={false}
              forceReRender={[amount, currency, style]}
              fundingSource={undefined}
              createOrder={(data, actions) => {
                  return actions.order
                      .create({
                          purchase_units: [
                              {
                                  amount: {
                                      currency_code: currency,
                                      value: ''+amount,
                                  },
                              },
                          ],
                      })
                      .then((orderId) => {
                          // Your code here after create the order
                          return orderId;
                      });
              }}
              onApprove={function (data, actions) : any {
                  return actions.order?.capture().then(function (details) {
                      // Your code here after capture the order
                      const shipping = details.purchase_units[0].shipping;
                      createOrder({
                        customer: shipping?.name?.full_name,
                        address: shipping?.address?.address_line_1,
                        total: amount,
                        method: 1
                      })
                      
                  });
              }}
          />
      </>
  );
}

const Cart = () => {

  const [open, setOpen] = useState(false);
  const products = useSelector((state : RootState) => state.cart.products);
  const total = useSelector((state : RootState) => state.cart.total);
  const dispatch = useDispatch();
  const router = useRouter();

  // This values are the props in the UI
  const amount = total;
  const currency = "USD";
  const style = {"layout":"vertical"};

  const createOrder = async (data : any) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if(response.ok){
        const result = await response.json();
        dispatch(reset())
        router.push(`/orders/${result._id}`);
      }
    
    } catch (error) {
      console.log(error);
      
    }
  }

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

          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton}>CASH ON DELIVERY</button>
              <PayPalScriptProvider
                    options={{
                        "client-id": process.env.paypal_client_id || 'test',
                        components: "buttons",
                        currency: "USD",
                        "disable-funding": 'credit,card'
                    }}
                >
                <ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                    style={style}
                    amount={amount}
                    createOrder={createOrder}
                />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>CHECKOUT NOW!</button>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
