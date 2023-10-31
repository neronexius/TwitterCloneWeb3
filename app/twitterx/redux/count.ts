import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


type Count = {
    count: number
}

const initialState:Count ={
    count: 0
} 

export const CountSlice = createSlice({
    name: "Count",
    initialState,
    reducers: {
        update_count: (state, action:PayloadAction<Count>) => {
            state.count += action.payload.count
        }
    }
})


export default CountSlice.reducer;
export const {update_count} = CountSlice.actions;