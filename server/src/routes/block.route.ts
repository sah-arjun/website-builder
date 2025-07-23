import { Router } from 'express';
import {
  createBlockController,
  getBlocksByPageController,
  updateBlockController,
  deleteBlockController,
} from '../controllers/block.controller';
import { protectedRoute } from '../middlewares/auth.middleware';

const blockRouter = Router();

// All routes require authentication
blockRouter.post('/', protectedRoute, createBlockController);
blockRouter.get('/:pageId', protectedRoute, getBlocksByPageController);
blockRouter.put('/:blockId', protectedRoute, updateBlockController);
blockRouter.delete('/:blockId', protectedRoute, deleteBlockController);

export default blockRouter;
