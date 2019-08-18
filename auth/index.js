const oauth2 = require('simple-oauth2');
const express = require('express');
const router = express.Router();

const { socialNetworksOauthInfo } = require('../config');

const generateSocialNetworkRouter = (clientName) => {
  const oauth2Client = oauth2.create(socialNetworksOauthInfo[clientName]);

  router.get(`/${clientName}`, (req, res) => {
    const authorizationUri = oauth2Client.authorizationCode.authorizeURL({
      redirect_uri: `http://localhost:3000/auth/${clientName}/callback`,
      scope: 'user'
    });

    res.redirect(authorizationUri);
  });

  router.get(`/${clientName}/callback`, async(req, res) => {
    const options = {
      code: req.query.code,
      redirect_uri: `http://localhost:3000/auth/${clientName}/callback`
    };

    try {
      // The resulting token.
      const result = await oauth2Client.authorizationCode.getToken(options);

      // Exchange for the access token.
      const token = oauth2Client.accessToken.create(result);

      return res.status(200).json(token);
    } catch (error) {
      console.error('Access Token Error', error.message);
      return res.status(500).json('Authentication failed');
    }
  });

  return router;
};

module.exports = generateSocialNetworkRouter;

