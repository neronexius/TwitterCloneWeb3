import { configureStore } from "@reduxjs/toolkit";
import { UserProfileSlice } from "./profile";
import { CountSlice } from "./count";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store =  configureStore({
    reducer: {
        user_profile: UserProfileSlice.reducer,
        count_data: CountSlice.reducer
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;