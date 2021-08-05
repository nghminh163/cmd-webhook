import { IFbUser } from '@/interfaces/routes/comment.interface';
import axios from 'axios';
import _ from 'lodash';

export const getDataFromCommentId = async (id: string): Promise<{ permalink_url: string; fbUser: IFbUser }> => {
  if (_.isString(id)) {
    const access_token = process.env.FB_ACCESS_TOKEN;
    const fields = 'permalink_url,from';
    const data: { permalink_url: string; from: IFbUser } = (
      await axios.get(`https://graph.facebook.com/v11.0/${id}?fields=${fields}&access_token=${access_token}`)
    ).data;
    return { permalink_url: data.permalink_url, fbUser: data.from };
  } else {
    throw Error('Invalid ID Comment');
  }
};
