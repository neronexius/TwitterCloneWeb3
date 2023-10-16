use crate::*;

#[account]
pub struct UserProfileState {
    pub number_of_post: u32, //4
    pub username: Option<String>, //1 + 4 + String.len()
    pub profile_image: Option<String> //1 + 4 + String.len()
}

///
#[account]
pub struct UsernameState {
}

#[account]
pub struct PostDataState {
    pub id: u32, //4
    pub owner: Pubkey, //32
    pub posted_time: i64, //8 
    pub number_of_comment: u32, //4
    pub content: Option<String>, //content.len() + 4
    pub image_url: Option<Vec<String>>, //4 + image_url.iter().map()
}

#[account]
pub struct CommentDataState {
    pub id: u32, //4
    pub commenter: Pubkey, // 32
    pub content: String // content.len() + 4 
}


