import NodeCache from 'node-cache';
import { generateToken } from './requests';
const myCache = new NodeCache();

myCache.on('expired', async function (key, value) {
  if (key === 'FB_ACCESS_TOKEN') {
    const { access_token, expires_in }: { access_token: string; expires_in: number } = await generateToken();
    myCache.set('FB_ACCESS_TOKEN', access_token, expires_in - 600);
  }
});

export default myCache;
