import {z} from "zod"
import { Connection, Keypair } from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { TwitterxClone } from "./idls/twitterx_clone";

const workspaceSchema = z.object({
    connection: z.instanceof(Connection),
    provider: z.instanceof(AnchorProvider),
    program: z.instanceof(Program<TwitterxClone>)
})

type Workspace = z.infer<typeof workspaceSchema>

export type {Workspace}

export {workspaceSchema}