export interface User{
    username: string,
    email: string,
    password: string | null | undefined,
    business_name: string | null | undefined,
    address: string | null | undefined,
    notifications: boolean
}