import React, { FormEvent, useState } from 'react'
import styles from '@/styles/Add.module.css'
import { Extra } from '@/utils/types';

const Add = ({setClose}: {setClose: (value : boolean) => void}) => {

    const [file, setFile] = useState<Blob>(new Blob());
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [prices, setPrices] = useState<number[]>([]);
    const [extraOptions, setExtraOptions] = useState<Extra[]>([]);
    const [extra, setExtra] = useState<Extra>({text: '', price: 1});
  
    const changePrice = (e : React.ChangeEvent<HTMLInputElement>, index: number) => {
      const currentPrices = [...prices];
      currentPrices[index] = parseFloat(e.target.value);
      setPrices(currentPrices);
    };
  
    const handleExtraInput = (e : React.ChangeEvent<HTMLInputElement>) => {
      setExtra({ ...extra, [e.target.name]: e.target.value });
    };
  
    const handleExtra = (e: FormEvent) => {
      e.preventDefault();
      setExtraOptions((prev) => [...prev, extra]);
      setExtra({text: '', price: 1});
    };
  
    const handleCreate = async () => {
      const cloudinary_url = process.env.cloudinary_url;

      if(!cloudinary_url) return;

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "uploads");
      try {
        const uploadReq = await fetch(
            cloudinary_url,
          {
            method: 'POST',
            body: data,
          }
        );
          
        if(!uploadReq.ok) throw new Error('Img upload failed!')

        const uploadRes = await uploadReq.json();
        const { url } = uploadRes;

        const newProduct = {
          title,
          desc,
          prices,
          extraOptions,
          img: url,
        };
  
        const res = await fetch("/api/products", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(newProduct),
        });

        if(!res.ok) throw new Error('Product creation failed!')
        setClose(true);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <span onClick={() => setClose(true)} className={styles.close}>
            X
          </span>
          <h1>Add a new Pizza</h1>
          <div className={styles.item}>
            <label className={styles.label}>Choose an image</label>
            <input type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.input}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Desc</label>
            <textarea
              rows={4}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Prices</label>
            <div className={styles.priceContainer}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Small"
                onChange={(e) => changePrice(e, 0)}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Medium"
                onChange={(e) => changePrice(e, 1)}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Large"
                onChange={(e) => changePrice(e, 2)}
              />
            </div>
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Extra</label>
            <form onSubmit={handleExtra} className={styles.extra}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="text"
                placeholder="Item"
                name="text"
                value={extra.text}
                onChange={handleExtraInput}
                required
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Price"
                name="price"
                min={1}
                value={extra.price}
                onChange={handleExtraInput}
                required
              />
              <button className={styles.extraButton}>
                Add
              </button>
            </form>
            <div className={styles.extraItems}>
              {extraOptions.map((option) => (
                <span key={option.text} className={styles.extraItem}>
                  {option.text}
                </span>
              ))}
            </div>
          </div>
          <button className={styles.addButton} onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    );
  };

export default Add