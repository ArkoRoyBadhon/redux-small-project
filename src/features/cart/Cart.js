import React, { useEffect } from "react";
import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAsync, fetchAsync, updateAsync } from "./cartSlice";

export function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const handleChange = (e, id) => {
    console.log(e.target.value);
    dispatch(updateAsync({id, change:{quantity: +e.target.value}}))
  }

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(fetchAsync())}
        >
          fetch Cart
        </button>
        {items.map((item) => (
          
          <div className="cart-item" style={{height: "200px", width: "600px", background: "red", display: "flex"}}>
            <img style={{width: "250px"}} className="img-fluid" src={item.thumbnail} alt="" />
            <div className="description">
              <p>{item.title}</p>
              <span>{item.brand}</span>
              <strong>${item.price}</strong>
            </div>
            <div className="quatity">
              Quantity
              <select value={item.quantity} onChange={(e)=>handleChange(e, item.id)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div className="close">
              <button onClick={()=> dispatch(deleteAsync(item.id))}>X</button>
            </div>
          </div>
        ))}
      </div>
      <h1>Total: {items.reduce((acc, iter) => iter.price * iter.quantity + acc,0)}</h1>
    </div>
  );
}
