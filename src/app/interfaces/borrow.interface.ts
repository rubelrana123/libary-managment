import { Model, Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;       
  quantity: number;          
  dueDate: Date;             
}
// static for avaivble update update
export interface BorrowStaticMethods extends Model<IBorrow> {
    checkBookAvailability(bookId: Types.ObjectId): Promise<void>
}