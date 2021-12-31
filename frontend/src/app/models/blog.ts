export interface Blog{
    news_id: number | null,
    submitted: Date | null,
    subject: string | null,
    title: string | null,
    content: string | null,
}

export interface BlogResponse{
    id: number,
    message: string
}

export interface BlogsResponse{
    results: Blog[]
}

export const NULL_BLOG :Blog = {
    news_id: null, 
    submitted: null,
    subject: null,
    title: null,
    content: null
}