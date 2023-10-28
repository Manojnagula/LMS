export function isEmail(string){
    return string.match(/^\S+@\S+\.\S+$/)
}

export function isValidPassword(string){
    return string.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/)
}