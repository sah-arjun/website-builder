import mongoose from 'mongoose';
import { toJSONPlugin } from '../plugins/toJSON.plugin';

const PageSchema = new mongoose.Schema({
  title: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

PageSchema.plugin(toJSONPlugin);

export default mongoose.model('Page', PageSchema);
