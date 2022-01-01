export interface User{
    username: string,
    email: string,
    business_name: string | null | undefined,
    address: string | null | undefined,
    notifications: boolean
}

export interface UserLogin{
    username: string, password: string
}