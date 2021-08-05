const { default: axios } = require('axios');

require('dotenv').config();
const access_token = process.argv[2];

axios
  .get(`https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/oauth/client_code`, {
    params: {
      client_id: process.env.APP_ID,
      client_secret: process.env.APP_SECRET,
      redirect_uri: process.env.REDIRECT_URL,
      access_token,
    },
  })
  .then(res => {
    console.log(res.data.code);
  })
  .catch(e => console.log('Something went wrong'));
