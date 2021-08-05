import 'dotenv/config';

import App from '@/app';

import IndexRoute from '@routes/index.route';
import WebhookRoute from '@routes/webhook.route';
import CommentRoute from '@routes/comment.route';

const app = new App([new IndexRoute(), new WebhookRoute(), new CommentRoute()]);

app.listen();
