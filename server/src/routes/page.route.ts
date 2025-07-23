import { Router } from 'express';
import {
  createPage,
  getMyPages,
  getPageById,
  updatePage,
} from '../controllers/page.controller';
import { protectedRoute } from '../middlewares/auth.middleware';

const pageRouter = Router();

pageRouter.use(protectedRoute);

pageRouter.post('/', createPage);
pageRouter.get('/', getMyPages);
pageRouter.get('/:id', getPageById);
pageRouter.put('/:id', updatePage);

export default pageRouter;
