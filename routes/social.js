const express = require('express');
const router = express.Router();
const axios = require('axios');

const socialHosts = require('../config');
const generateSocialNetworkRouter = require('../auth');

// router.get('/facebook/bio', (req, res) => {
//   axios({
//     method:'get',
//     url:`https://${socialHosts.facebook}/me?fields=first_name,last_name,birthday&access_token=${req.query.access_token}`,
//   })
//     .then((response) => {
//       res.send(response.data);
//     })
//     .catch(err => console.error(err));
// });
//
// router.get('/photos', (req, res) => {
//   res.render('login');
// });

const github = generateSocialNetworkRouter('github');
console.log(github);
console.log(github);

module.exports = router;
