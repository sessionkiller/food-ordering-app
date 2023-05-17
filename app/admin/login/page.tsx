'use client';
import React, { FormEvent, useState } from 'react'
import { useRouter } from "next/navigation";
import styles from "@/styles/Login.module.css";

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }), 
      });

      if(!res.ok) {
        const data = await res.json();
        throw new Error(data)
      }

      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit' className={styles.button}>
          Sign In
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </form>
    </div>
  );
};

export default Page;