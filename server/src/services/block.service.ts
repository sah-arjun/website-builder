import Block from '../models/Block';

export const createBlockService = async (
  userId: string,
  pageId: string,
  type: string,
  content: string
) => {
  const newBlock = new Block({
    user: userId,
    page: pageId,
    type,
    content,
  });
  return await newBlock.save();
};

export const getBlocksByPageService = async (
  userId: string,
  pageId: string
) => {
  return await Block.find({ user: userId, page: pageId }).sort({ createdAt: 1 });
};

export const updateBlockService = async (
  userId: string,
  blockId: string,
  type: string,
  content: string
) => {
  return await Block.findOneAndUpdate(
    { _id: blockId, user: userId },
    { type, content },
    { new: true }
  );
};

export const deleteBlockService = async (
  userId: string,
  blockId: string
) => {
  return await Block.findOneAndDelete({ _id: blockId, user: userId });
};
