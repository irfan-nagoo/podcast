
export class Podcast {
    id: number = 0;
    title: string = '';
    description: string = '';
    author: string = '';
    uri: string = '';
    category: string = '';
    duration: string = '';
    tags: string[] = [];
    rating: string = '';
    createDate: Date = new Date;
    modifiedDate: Date = new Date;
}
