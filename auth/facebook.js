const oauth2 = require('simple-oauth2');
const express = require('express');
const router = express.Router();
const axios = require('axios');

const facebook = oauth2.create({
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
  },
  auth: {
    authorizeHost: 'https://facebook.com/',
    authorizePath: '/dialog/oauth',

    tokenHost: 'https://graph.facebook.com',
    tokenPath: '/oauth/access_token'
  }
});

router.get('/facebook', (req, res) => {
  const authorizationUri = facebook.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/auth/facebook/callback',
    scope: ['email', 'user_birthday', 'user_photos', 'user_hometown', 'user_posts']
  });

  res.redirect(authorizationUri);
});

router.get('/facebook/callback', async(req, res) => {
  const options = {
    code: req.query.code,
    redirect_uri: 'http://localhost:3000/auth/facebook/callback'
  };

  try {
    // The resulting token
    const result = await facebook.authorizationCode.getToken(options);

    // Exchange for the access token
    const token = facebook.accessToken.create(result);

    return res.redirect(`/social/facebook/bio?access_token=${token.token.access_token}`);
  } catch (error) {
    console.error('Access Token Error', error.message);
    return res.status(500).json('Authentication failed');
  }
});

router.get('/facebook/birthday', (req, res) => {
  axios({
    method:'get',
    url:"https://graph.facebook.com/me?fields=birthday&access_token=EAAh6WCSxLUcBAFHYbdPtmZAejcoedfDHeXgEmcljGgo44volskpQQtLzKbpJc7OZCgle8ds2qYWVTCAlyQMA2dPsmEcY1musZCAstv4HxkZCPzlZBbatVc8R7tdpDi1Y0LiswoptLhSyPQ1CtWbQvW4MfOHKYy9igvehpbUI26htEZAV1rMuje",
  })
    .then(function (response) {
      res.send(response.data);
    })
    .catch(err => console.log(err));
});

module.exports = router;

