const axios = require('axios');

const API_KEY = 'CNQZRPSZXHGUKH391HHGLBCXQ0VODCK';
const MERCHANT_ID = 'botuns';

const requestBody = {
  provider: 'MTN',
  number: '09134516158',
  amount: '100',
  reference: 'GBR_2459392959593939',
};

axios.post(
  'https://sandbox.giftbills.com/api/v1/airtime/topup', // Replace with the actual API endpoint
  requestBody,
  {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      MerchantId: MERCHANT_ID,
      'Content-Type': 'application/json',
    },
  }
)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });


//   const username = 'botuns';
// const password = '79wkayNQ4R9Xuyp';

// axios.get('https://giftbills.com/api/v1/check-balance', {
//   params: {
//     username: username,
//     password: password,
//   }
// })
//   .then(response => {
//     console.log('Response:', response.data);
//   })
//   .catch(error => {
//     console.error('Error:', error.message);
//   });
// // In this code snippet, we're making a GET request to the URL 'https://giftbills.com/api/check-balance' with the parameters username and password. The params property in the Axios configuration allows you to pass the parameters as an object. The username and password values 