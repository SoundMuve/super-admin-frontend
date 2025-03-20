export type blogInterface = {
    _id: string,
    title: string,
    slug: string,
    content: string,
    featuredImage: string,

    author: string,
    author_email: string,
    author_name: string,

    categories: string[],
    tags: string[],
    metaTitle: string,
    metaDescription: string,
    keywords: string[],
    comments: string[],
    views: number,
    allowComments: boolean,
    status: "draft" | "scheduled" | "published" | "trashed",

    publishedAt: string,
    trashedAt: string,

    updatedBy: {
        user_id: string,
        user_email: string,
        name: string,
        updatedAt: string,
    },

    createdAt: string;
    updatedAt: string;
};

export type commentInterface = {
    _id: string,
    content: string,
    author_name: string,
    author_email: string,
    post_id: any,
    status: "pending" | "approved",

    createdAt: string;
    updatedAt: string;
};