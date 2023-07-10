const axios = require('axios');


//
// buy airtime here:
//
const options = {
  method: 'POST',
  url: 'https://billing-service.bytestacks.io/api/v1/vend_airtime',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'api-key': ''
  },
    data: {amount: '100', phone_no: '09134516158', telco: 'mtn', reference: '2134567890-'}
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
  //end