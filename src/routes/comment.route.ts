import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CommentController from '@/controllers/comment.controller';

class CommentRoute implements Routes {
  public path = '/comments';
  public router = Router();
  public commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.commentController.getComments);
    this.router.get(`${this.path}/count`, this.commentController.countComments);
    this.router.post(`${this.path}/read`, this.commentController.markAsRead);
  }
}

export default CommentRoute;
