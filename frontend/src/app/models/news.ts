export interface News{
    news_id: number | null,
    submitted: string | null,
    subject: string | null,
    title: string | null,
    content: string | null,
}

export interface NewsPostResponse{
    id: number,
    message: string
}

export interface NewsResponse{
    results: News[]
}

export const NULL_NEWS : News = {
    news_id: null, 
    submitted: null,
    subject: null,
    title: null,
    content: null
}