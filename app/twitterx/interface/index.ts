import * as anchor from "@project-serum/anchor"
import * as web3 from "@solana/web3.js";

export type UserProfile = {
    username: string | null,
    numberOfPost: number,
    profileImage: string | null,
    key: string,
    profile_pda: string
}


export interface Post {
        content: string | null ,  
        id: number, 
        imageUrl: Array<string> | any,
        numberOfComment:number,
        owner: web3.PublicKey,
        postedTime: anchor.BN
}

