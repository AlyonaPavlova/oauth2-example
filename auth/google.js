const oauth2 = require('simple-oauth2');
const express = require('express');
const router = express.Router();

const google = oauth2.create({
  client: {
    id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
  },
  auth: {
    authorizeHost: 'https://accounts.google.com',
    authorizePath: '/o/oauth2/v2/auth',

    tokenHost: 'https://www.googleapis.com',
    tokenPath: '/oauth2/v4/token'
  }
});

router.get('/google', (req, res) => {
  const authorizationUri = google.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/auth/google/callback',
    scope: 'profile email'
  });

  res.redirect(authorizationUri);
});

router.get('/google/callback', async(req, res) => {
  const options = {
    code: req.query.code,
    redirect_uri: 'http://localhost:3000/auth/google/callback'
  };

  try {
    // The resulting token.
    const result = await google.authorizationCode.getToken(options);

    // Exchange for the access token.
    const token = google.accessToken.create(result);

    return res.status(200).json(token);
  } catch (error) {
    console.error('Access Token Error', error.message);
    return res.status(500).json('Authentication failed');
  }
});

module.exports = router;

