import * as web3 from "@solana/web3.js";

export interface UserProfile{
    username?: string | null,
    numberOfPost?: number,
    profileImage?: string | null,
    key?: web3.PublicKey,
    profile_pda?: web3.PublicKey
}