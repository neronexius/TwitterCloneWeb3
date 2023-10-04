import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TwitterxClone } from "../target/types/twitterx_clone";
import { expect } from "chai";
import fs from "fs";

describe("facebook_clone", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.TwitterxClone as Program<TwitterxClone>;
  const [userProfilePda] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("user_profile"), provider.publicKey.toBuffer()], program.programId);
  
  // let new_account: anchor.web3.Keypair;
  // let new_account_pda: anchor.web3.PublicKey;
  
  // before(async () => {
  //   new_account = anchor.web3.Keypair.generate();
  //   await provider.connection.requestAirdrop(new_account.publicKey, 2);
  //   let [pda] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("user_profile"), new_account.publicKey.toBuffer()], program.programId);
  //   new_account_pda = pda
  //   console.log("NEW" , new_account);
  //   console.log("NEW PDA", pda)
  // })
  
  it("Initialise Userprofile", async () => {
      const tx = await program.methods.initialiseUserProfile()
      .accounts({
        userProfile: userProfilePda
      })
      .rpc();

      console.log("tx: ", tx);

      let account_username = (await program.account.userProfileState.fetch(userProfilePda)).username;
      console.log(account_username);
      expect(account_username == null, "Seems like they are not correct");
  });

  it("Initialise Username", async () => {
    let user_input_username = "King"
    let [username] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("username"), Buffer.from(user_input_username.toLowerCase())], program.programId);
    const tx = await program.methods.initialiseUserUsername(user_input_username)
    .accounts({
      username: username,
      userProfile: userProfilePda
    })
    .rpc()
    console.log("tx : ", tx);

    let account_username = (await program.account.userProfileState.fetch(userProfilePda)).username;
    console.log(account_username);
    expect(account_username == user_input_username, "NOt the same");

  })

  it("Testing Using Capital Letter to generate same username" ,async() => {
    try{
      let new_account = anchor.web3.Keypair.generate();
      let money = await provider.connection.requestAirdrop(new_account.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL);
      await provider.connection.confirmTransaction(money);
      let [pda] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("user_profile"), new_account.publicKey.toBuffer()], program.programId);
      
      const tx = await program.methods.initialiseUserProfile()
      .accounts({
        userProfile: pda,
        initialiser: new_account.publicKey
      })
      .signers([new_account])
      .rpc();
      console.log("TX : ", tx)
      let user_input_username = "KING";
      let [user_username_pda] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("username"), Buffer.from(user_input_username.toLowerCase())], program.programId);
      const tx2 = await program.methods.initialiseUserUsername(user_input_username)
      .accounts({
        username: user_username_pda,
        userProfile: pda,
        owner: new_account.publicKey
      })
      .signers([new_account])
      .rpc()

      console.log("tx2: ", tx2)


  }catch(err){
    console.log(err);
    
  }

  })

});
