import { Document, Types } from 'mongoose';
export type BlogDocument = Blog & Document;
export declare class Blog {
    title: string;
    content: string;
    poster_image: string;
    images: string[];
    author: Types.ObjectId;
    is_active: boolean;
}
export declare const BlogSchema: import("mongoose").Schema<Blog, import("mongoose").Model<Blog, any, any, any, Document<unknown, any, Blog, any> & Blog & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Blog, Document<unknown, {}, import("mongoose").FlatRecord<Blog>, {}> & import("mongoose").FlatRecord<Blog> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
