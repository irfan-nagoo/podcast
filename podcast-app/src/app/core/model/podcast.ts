
export interface Podcast {
    id: number;
    title: string;
    description: string;
    author: string;
    uri: string;
    category: string;
    duration: string,
    tags: string[];
    rating: string;
    createDate: Date;
    modifiedDate: Date;
}
