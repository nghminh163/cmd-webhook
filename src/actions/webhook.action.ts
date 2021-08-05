import { IWebhookReceiveEntryChangeField, IWebhookReceiveEntryChangeValue } from '@/interfaces/routes/webhook.interface';
import { getDataFromCommentId } from '@/utils/requests';
import { PrismaClient } from '@prisma/client';
import moment from 'moment';
class WebhookAction {
  private prisma = new PrismaClient();
  public async comment(value: IWebhookReceiveEntryChangeValue, type: IWebhookReceiveEntryChangeField) {
    const {
      created_time,
      from: { id: fromId },
      id,
      message,
    } = value;
    const linkAndProfile = await getDataFromCommentId(id);

    await this.prisma.comment.create({
      data: {
        permalink_url: linkAndProfile.permalink_url,
        id,
        user: {
          connectOrCreate: {
            where: {
              id: fromId,
            },
            create: {
              id: fromId,
              name: linkAndProfile.fbUser.name,
            },
          },
        },
        postUri: '',
        isRead: false,
        type: type === IWebhookReceiveEntryChangeField.PLUGIN_COMMENT ? 'NEW_COMMENT' : 'REPLY_COMMENT',
        created_date: moment(created_time).toDate(),
        content: message,
      },
    });
  }
}

export default WebhookAction;
