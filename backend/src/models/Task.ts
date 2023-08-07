import mongoose, { Document, Schema, Types } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  user: Types.ObjectId;
  dueDate: Date;
  isCompleted: boolean;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Change type here
    dueDate: { type: Date, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
