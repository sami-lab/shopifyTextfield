import axios from 'axios';
// var qs = require('qs');

export default install = () => {
  //this is storename for which we are genrating token
  var storeName = window.location.href.split('//')[1].split('/')[0];

  var data = JSON.stringify({
    install: storeName,
  });

  axios
    .post(
      'https://inspon-app.com/textfield/Backend/api/install.php',
      {
        data,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then((response) => {
      //if(success) //redurect to component else call another api to install app
      return response.data; //Make sure to check if response.data exist who ever consuming this function else display error
    })
    .catch(function (error) {
      return error;
    });
};
