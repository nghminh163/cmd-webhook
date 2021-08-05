import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { forceParseNumber } from '@utils/validate';
import { getDataFromCommentId } from '@/utils/requests';
class CommentController {
  private prisma = new PrismaClient();

  public getComments = async (req: Request, res: Response): Promise<void> => {
    const { offset, limit } = req.query;
    try {
      let results = await this.prisma.comment.findMany({
        skip: forceParseNumber(offset, true),
        take: forceParseNumber(limit, true),
        orderBy: {
          created_date: 'desc',
        },
        include: {
          user: true,
        },
      });
      res.json(results);
    } catch (e) {
      res.status(400).send(e);
    }
  };

  public markAsRead = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    await this.prisma.comment.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
    res.send(200)
  };

  public markAsUnread = async (req: Request, res: Response): Promise<void> => {};
  public countComments = async (req: Request, res: Response): Promise<void> => {
    try {
      let count = await this.prisma.comment.count();
      res.send(count + '');
    } catch (e) {
      res.status(400).send(e);
    }
  };
}

export default CommentController;
