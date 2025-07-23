import { Request, Response } from 'express';
import {
  createBlockService,
  getBlocksByPageService,
  updateBlockService,
  deleteBlockService,
} from '../services/block.service';
import { BlockInput } from '../types/block.type';

export const createBlockController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;
    const { pageId, type, content } = req.body as BlockInput;

    const block = await createBlockService(userId, pageId, type, content);
    res.status(201).json(block);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getBlocksByPageController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;
    const pageId = req.params.pageId;

    const blocks = await getBlocksByPageService(userId, pageId);
    res.status(200).json(blocks);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBlockController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;
    const blockId = req.params.blockId;
    const { type, content } = req.body as Pick<BlockInput, 'type' | 'content'>;

    const block = await updateBlockService(userId, blockId, type, content);
    res.status(200).json(block);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBlockController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;
    const blockId = req.params.blockId;

    await deleteBlockService(userId, blockId);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
