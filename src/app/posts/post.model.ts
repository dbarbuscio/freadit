/**
 * Interface for user posts
 */

 export interface Post {
   id: string;
   title: string;
   user: string;
   score: number;
   content: string;
 }
