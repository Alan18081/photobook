const {redirectDomain} = require('../../config/keys');

module.exports = (email,token) => `
  <html>
    <head>
      <style>
        body {
          font-family: Arial,sans-serif;
        }
        .wrapper {
          border: 1px solid #cccccc;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
        }
        h1 {
          text-align: center;
          font-size: 21px;
          color: #323232;
          margin-bottom: 20px;
        }
        .btn {
          font-weight: bold;
          text-decoration: none;
          background-color: #28bbf0;
          color: #fff !important;
          padding: 10px 15px;
          border-radius: 5px;
          transition: all .5s ease;
          font-size: 18px;
        }
        .btn:hover {
          background-color: #0287b7;
        }
        p {
          margin-bottom: 20px;
          font-size: 18px;
        }
        img {
          width: 50px
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <i>Portfolio</i> 
        <h1>Восстановление пароля для почты: ${email}</h1>
        <p>Перейдите по ссылке и создайте новый пароль</p>
        <a class="btn" href="${redirectDomain}/api/resetPasswordSuccess/${token}">Восстановить пароль</a>
      </div>
    </body>
  </html>
`;