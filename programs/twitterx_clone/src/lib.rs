use anchor_lang::prelude::*;

pub mod state;
pub use state::*;

pub mod error;
pub use error::*;

pub mod constants;
pub use constants::*;

pub mod instructions;
pub use instructions::*;

pub mod utils;
pub use utils::*;


declare_id!("QtAYuQskUSZ2WWMFC2S3D7bFVgzkZrijNp7tG1hSbvq");

#[program]
pub mod twitterx_clone {
    use super::*;

    pub fn initialise_user_profile(mut ctx: Context<InitialiseUserProfile>) -> Result<()> {
        InitialiseUserProfile::initialise(&mut ctx)
    }

    pub fn initialise_user_username(mut ctx: Context<InitialiseUsername>, input_username: String ) -> Result<()>  {
        InitialiseUsername::init_username(&mut ctx, input_username)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
