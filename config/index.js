module.exports.socialNetworksOauthInfo = {
  facebook: {
    client: {
      id: process.env.FACEBOOK_CLIENT_ID,
      secret: process.env.FACEBOOK_CLIENT_SECRET,
    },
    auth: {
      authorizeHost: 'https://facebook.com/',
      authorizePath: '/dialog/oauth',

      tokenHost: 'https://graph.facebook.com',
      tokenPath: '/oauth/access_token'
    }
  },
  google: {
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
  },
  github: {
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
  }
};
