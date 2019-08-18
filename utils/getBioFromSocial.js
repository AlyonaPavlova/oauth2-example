const axios = require('axios');

export function getBioFromSocial() {
  return axios({
    method:'get',
    url:`https://${req.socialHost}/me?fields=last_name,first_name,birthday,email,hometown&access_token=${req.accessToken}`,
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch(err => console.error(err));
}