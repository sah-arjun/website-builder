import mongoose from 'mongoose';
import { toJSONPlugin } from '../plugins/toJSON.plugin';

const BlockSchema = new mongoose.Schema({
  pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
  type: { type: String, required: true },   // e.g. "text", "image"
  content: { type: mongoose.Schema.Types.Mixed },
  order: Number,
}, { timestamps: true });

BlockSchema.plugin(toJSONPlugin);

export default mongoose.model('Block', BlockSchema);
