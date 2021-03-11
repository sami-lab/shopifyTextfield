import axios from 'axios';
export const generateToken = () => {
  var storeName = window.location.href.split('//')[1].split('/')[0];
  axios
    .post('https://inspon-app.com/textfield/backend/api/generateToken.php', {
      storeName,
    })
    .then((response) => {
      console.log(response);
    });
};
