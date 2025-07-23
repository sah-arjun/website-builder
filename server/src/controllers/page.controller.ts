import { Request, Response } from "express";
import { createPageService, getUserPagesService, getPageByIdService, updatePageService } from '../services/page.service';

export const createPage = async (req: Request, res: Response) => {
  try {
    const { title, blocks } = req.body;
    const userId = (req as any).userId;
    console.log(title, blocks, userId);
    const page = await createPageService(userId, title, blocks);
    res.status(201).json(page);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create page', error: error.message });
  }
};

export const getMyPages = async (req: Request, res: Response) => {
  try {
    const pages = await getUserPagesService((req as any).userId);
    res.json(pages);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch pages', error: error.message });
  }
};

export const getPageById = async (req: Request, res: Response) => {
  try {
    const page = await getPageByIdService((req as any).userId, req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch page', error: error.message });
  }
};

export const updatePage = async (req: Request, res: Response) => {
  try {
    const { title, blocks } = req.body;
    const page = await updatePageService((req as any).userId, req.params.id, title, blocks);
    if (!page) {
      return res.status(404).json({ message: 'Page not found or unauthorized' });
    }
    res.json(page);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update page', error: error.message });
  }
};
