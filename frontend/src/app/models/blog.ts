export interface Blog{
    id: number | null,
    submitted: Date | null,
    subject: string | null,
    title: string | null,
    content: string | null,
}

export interface BlogResponse{
    id: number,
    message: string
}

export const NULL_BLOG :Blog = {
    id: null, 
    submitted: null,
    subject: null,
    title: null,
    content: null
}