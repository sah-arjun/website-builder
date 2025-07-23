import { Router } from 'express';
import {
  createPage,
  getMyPages,
  getPageById,
  updatePage,
} from '../controllers/page.controller';
import { protectedRoute } from '../middlewares/auth.middleware';

const pageRouter = Router();

pageRouter.post('/', protectedRoute, createPage);
pageRouter.get('/', protectedRoute, getMyPages);
pageRouter.get('/:id', protectedRoute, getPageById);
pageRouter.put('/:id', protectedRoute, updatePage);

export default pageRouter;
