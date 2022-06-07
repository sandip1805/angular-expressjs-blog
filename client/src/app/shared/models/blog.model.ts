export interface Blog {
    id: number;
    title: string;
    description: string;
    date: string;
}

export interface Blogs {
    politics: Blog[],
    business: Blog[]
}