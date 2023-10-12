use crate::*;

#[derive(Accounts)]
#[instruction(content:Option<String>, image_url:Option<Vec<String>>)]
pub struct CreatePost<'info> {
    #[account(
        mut,
        seeds = [USER_PROFILE_SEED.as_bytes(), user.key().as_ref()],
        bump
    )]
    pub user_profile: Account<'info, UserProfileState>,

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        seeds = [POST_SEED.as_bytes(), user_profile.key().as_ref(), (user_profile.number_of_post + 1).to_le_bytes().as_ref()],
        bump,
        payer = user,
        space = 4 + 32 + 4 + (4 + 1 + content.unwrap_or_else(|| {String::from("")}).len()) + (4 + 1 + image_url.unwrap_or_else(|| {Vec::new()}).iter().map(|x| x.len()).sum::<usize>()) + 8
    )]
    pub post: Account<'info, PostDataState>,

    pub system_program: Program<'info, System>,
}

impl CreatePost<'_>{
    pub fn create_post(ctx: &mut Context<Self>, content: Option<String>, image_url: Option<Vec<String>>) -> Result<()>{
        msg!("Creating Post... ");
        msg!("Content: {}", content.clone().unwrap());
        msg!("Image url: {:?}", image_url.clone().unwrap());
        let clock = Clock::get()?;
        ctx.accounts.post.id = ctx.accounts.user_profile.number_of_post + 1;
        ctx.accounts.post.owner = ctx.accounts.user.key();
        ctx.accounts.post.number_of_comment = 0;
        ctx.accounts.post.image_url = image_url;
        ctx.accounts.post.content = content;
        ctx.accounts.post.posted_time = clock.unix_timestamp;

        msg!("Added Post detail.. Posting...");

        Ok(())
    }
}