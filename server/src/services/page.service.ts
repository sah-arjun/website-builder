import Page from '../models/Page';

// Create a new page with optional blocks
export const createPageService = async (userId: string, title: string, blocks = []) => {
  const newPage = new Page({
    userId,
    title,
    blocks,
  });
  return await newPage.save();
};

// Get all pages for the authenticated user
export const getUserPagesService = async (userId: string) => {
  return await Page.find({ user: userId }).sort({ updatedAt: -1 });
};

// Get a single page by its ID if it belongs to the user
export const getPageByIdService = async (userId: string, pageId: string) => {
  return await Page.findOne({ _id: pageId, user: userId });
};

// Update a page's title and blocks (if it belongs to the user)
export const updatePageService = async (userId: string, pageId: string, title: string, blocks: string) => {
  return await Page.findOneAndUpdate(
    { _id: pageId, user: userId },
    { title, blocks },
    { new: true }
  );
};
