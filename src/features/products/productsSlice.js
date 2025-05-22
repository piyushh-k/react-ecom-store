import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        try {
            const response = await fetch(`${API_URL}/products`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const modifiedData = data.map((product) => ({
                ...product,
                price : Math.round(product.price)
            }));
            return modifiedData;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
);

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
            state.error = null;
        })
        builder.addCase(fetchProducts.fulfilled , (state,action) => {
            state.status = 'succeeded';
            state.items = action.payload;
            state.error = null;
        })
        builder.addCase(fetchProducts.rejected , (state, action) => {
            state.error = action.error.message;
            state.status = 'failed';
        })
    },
})

export default productsSlice.reducer;
