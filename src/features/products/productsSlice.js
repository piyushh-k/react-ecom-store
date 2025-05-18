import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await response.json();
        return data;
    }
)

const productsSlice = createSlice({
    name : 'products',

    initialState: {
        items : [],
        status : 'idle',
        error : null
    },

    extraReducers : (builder) => {
        builder.addCase(fetchProducts.pending , (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchProducts.fulfilled , (state,action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        builder.addCase(fetchProducts.rejected , (state, action) => {
            state.error = action.error.message;
            state.status = 'failed';
        })
    },
})

export default productsSlice.reducer;