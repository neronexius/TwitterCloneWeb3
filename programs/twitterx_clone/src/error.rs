use crate::*;



#[error_code]

pub enum ProfileErrors {
    #[msg("Username is too big!")]
    UsernameIsTooBig, 

    #[msg("Already Initialised Username")]
    UsernameHasAlreadyBeenInitialise,

    #[msg("Username contain Non Alphabatic")]
    UsernameContainsSymbolsThatAreNotAllowed
}