use crate::*;

#[derive(Accounts)]
pub struct InitialiseUserProfile<'info> {
    #[account(
        init,

        seeds = [USER_PROFILE_SEED.as_bytes(), initialiser.key().as_ref()],
        bump,
        space = 8 + 4 + 1,
        payer = initialiser
    )]
    pub user_profile: Account<'info, UserProfileState>,

    #[account(mut)]
    pub initialiser: Signer<'info>,

    pub system_program: Program<'info, System>
}

impl InitialiseUserProfile<'_> {
    pub fn initialise(ctx: &mut Context<Self>) -> Result<()> {
        msg!("Created User Profile");

        ctx.accounts.user_profile.number_of_post = 0; 
        
        Ok(())
    }
}