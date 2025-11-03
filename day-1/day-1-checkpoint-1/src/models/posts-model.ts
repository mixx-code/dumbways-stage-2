export interface Post {
    id: number,
    title: string,
    content: string
}

export const posts:Post[] = [
    {id: 1, title: "judul ke satu", content: "content ke satu"},
    {id: 2, title: "judul ke dua", content: "content ke dua"}
]