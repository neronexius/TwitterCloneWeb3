import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { UserProfile } from "@/interface";
import {PublicKey} from "@solana/web3.js"

// the bellow publickeys are dummy publickey, account that belongs to the program but does not function as anything.
// The purpose of the design is to allow other part of the development to be more convenient as there wont be alot of redundant check if keys are available
// The design is possible because we will definitely get the key and profile_pda once the user connect his wallet.
const initialState: UserProfile = {
    username: null,
    profileImage: null,
    numberOfPost: 0,
    key: new PublicKey("2fWFysx8y9W3uKHZYhr26nPLwY1sXFwituC6zaLUgj6R"),
    profile_pda: new PublicKey("2fWFysx8y9W3uKHZYhr26nPLwY1sXFwituC6zaLUgj6R")
}

export const UserProfileSlice = createSlice({
    name: "Profile",
    initialState,
    reducers:{
        update_profile: (state:UserProfile, action: PayloadAction<UserProfile>) => {
            state.username = action.payload.username;
            state.numberOfPost = action.payload.numberOfPost;
            state.profileImage = action.payload.profileImage;
            state.key = action.payload.key;
            state.profile_pda = action.payload.profile_pda;
        },
        clear_profile: (state: UserProfile) => {
            state.username = null,
            state.numberOfPost = 0,
            state.profileImage = null,
            state.key = new PublicKey("2fWFysx8y9W3uKHZYhr26nPLwY1sXFwituC6zaLUgj6R"),
            state.profile_pda = new PublicKey("2fWFysx8y9W3uKHZYhr26nPLwY1sXFwituC6zaLUgj6R")
        }
    }
})

export default UserProfileSlice.reducer;
export const { update_profile, clear_profile } = UserProfileSlice.actions