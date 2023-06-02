import React, { useEffect, useState } from "react";
import { fetchAsync } from "./productsSlice";
import styles from "./Products.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addAsync } from "../cart/cartSlice";

export function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);
  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(fetchAsync())}
        >
          fetch Products
        </button>
        {products.map((product) => (
          <div className={styles.card}>
            <img src={product.thumbnail} alt={product.title} style={{ width: "100%" }} />
            <h1>{product.title}</h1>
            <p className={styles.price}>${product.price}</p>
            <p>{product.description}</p>
            <p>
              <button onClick={() => dispatch(addAsync(product))}>Add to Cart</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
