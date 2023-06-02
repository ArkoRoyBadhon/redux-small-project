import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchItems, addItem, updateItem, deleteItem } from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const fetchAsync = createAsyncThunk("carts/fetchItems", async () => {
  const response = await fetchItems();
  return response.data;
});
export const addAsync = createAsyncThunk("carts/addItems", async (item) => {
  const { id, title, brand, thumbnail, price } = item;
  const response = await addItem({
    id,
    title,
    brand,
    thumbnail,
    price,
    quantity: 1,
  });
  return response.data;
});

export const deleteAsync = createAsyncThunk("carts/deleteItem", async (id) => {
  await deleteItem(id);
  return id;
});

export const updateAsync = createAsyncThunk("carts/updateItem", async ({id, change}) => {
  console.log("change", change);
  const response = await updateItem(id, change);
  console.log("response",response.data);
  return response.data;
});


export const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(item => item.id === action.payload)
        state.items.splice(index, 1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items.splice(index, 1, action.payload);
      });
  },
});

// export const { } = cartsSlice.actions;

export default cartsSlice.reducer;
