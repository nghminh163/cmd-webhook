import { IFbUser } from '@/interfaces/routes/comment.interface';
import axios from 'axios';
import _ from 'lodash';
import myCache from './cache';

export const getDataFromCommentId = async (id: string): Promise<{ permalink_url: string; fbUser: IFbUser }> => {
  if (_.isString(id)) {
    const access_token = myCache.get('FB_ACCESS_TOKEN');
    const fields = 'permalink_url,from';
    const data: { permalink_url: string; from: IFbUser } = (
      await axios.get(`https://graph.facebook.com/v11.0/${id}?fields=${fields}&access_token=${access_token}`)
    ).data;
    return { permalink_url: data.permalink_url, fbUser: data.from };
  } else {
    throw Error('Invalid ID Comment');
  }
};

export const generateToken = async (access_token?: string): Promise<{ access_token: string; expires_in: number }> => {
  try {
    if (!access_token) {
      access_token = myCache.get('FB_ACCESS_TOKEN');
    }
    const data = (
      await axios.get(`https://graph.facebook.com/v${process.env.GRAPH_API_VERSION}/oauth/access_token`, {
        params: {
          grant_type: 'fb_exchange_token',
          client_id: process.env.APP_ID,
          client_secret: process.env.APP_SECRET,
          fb_exchange_token: access_token,
        },
      })
    ).data;
    return data;
  } catch (e) {
    throw Error(e);
  }
};
