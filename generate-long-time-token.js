const { default: axios } = require('axios');

require('dotenv').config();

axios
  .get(`https://graph.facebook.com/v${process.env.GRAPH_API_VERSION}/oauth/access_token`, {
    params: {
      code: process.env.FB_APP_CODE,
      client_id: process.env.APP_ID,
      redirect_uri: process.env.REDIRECT_URL,
    },
  })
  .then(res => {
    console.log(res.data.access_token);
  })
  .catch(e => console.log(e));
