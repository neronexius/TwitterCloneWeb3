pub fn contains_only_alphabets_number(input: &str) -> bool {
    input.chars().all(|x| x.is_alphanumeric())
}