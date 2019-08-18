const oauth2 = require('simple-oauth2');
const express = require('express');
const router = express.Router();

const github = oauth2.create({
  client: {
    id: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET,
  },
  auth: {
    authorizeHost: 'https://github.com',
    authorizePath: '/login/oauth/authorize',

    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token'
  }
});

router.get('/github', (req, res) => {
  const authorizationUri = github.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/auth/github/callback',
    scope: 'user'
  });

  res.redirect(authorizationUri);
});

router.get('/github/callback', async(req, res) => {
  const options = {
    code: req.query.code,
    redirect_uri: 'http://localhost:3000/auth/github/callback'
  };

  try {
    // The resulting token.
    const result = await github.authorizationCode.getToken(options);

    // Exchange for the access token.
    const token = github.accessToken.create(result);

    return res.status(200).json(token);
  } catch (error) {
    console.error('Access Token Error', error.message);
    return res.status(500).json('Authentication failed');
  }
});

module.exports = router;

