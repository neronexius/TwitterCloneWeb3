use crate::*; 
//Design idea 
//The reason why username is created by creating a PDA is for Unique Username. 
//Using the seed to generate the Username, allows exclusivity
//Because usernames are now in lowercase, there won't be any identical usernames with certain letters capitalized
//However, the disadvantage of this design is that it will incur a small charge to the user (creating PDA account)
#[derive(Accounts)]
#[instruction(name:String)]
pub struct InitialiseUsername<'info>  { 
    #[account(
        mut, 
        seeds = [USER_PROFILE_SEED.as_bytes(), owner.key().as_ref()],
        bump,
        realloc = 8 + 4 + 1 + (4 + name.len()),
        realloc::payer = owner,
        realloc::zero = false

    )]
    pub user_profile: Account<'info, UserProfileState>,

    #[account(mut)]
    pub owner: Signer<'info>, 

    #[account(
        init,
        seeds = [USERNAME.as_bytes(), name.to_ascii_lowercase().as_bytes()],
        bump, 
        space = 8,
        payer = owner
    )]
    pub username: Account<'info, UsernameState>,

    pub system_program: Program<'info, System>,

}

impl InitialiseUsername<'_> {
    pub fn init_username(ctx: &mut Context<Self>, name:String) -> Result<()> {
        msg!("Creating Unique Username");
        //Do not allow username to contain symbols or other form of characters
        if !util::contains_only_alphabets_number(&name){
            return err!(ProfileErrors::UsernameContainsSymbolsThatAreNotAllowed)
        }   
    
        if name.len() > 30 {
            return err!(ProfileErrors::UsernameIsTooBig);
        }

        match &ctx.accounts.user_profile.username {
            Some(_name) => {
                return err!(ProfileErrors::UsernameHasAlreadyBeenInitialise)
            }
            None =>  {
                ctx.accounts.user_profile.username = Some(name);
            }
        }

        Ok(())
    }
}
