const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
    <html>
      <head>
        <style>
          .survey {
          text-align: center;
        }
          .survey__content {
          text-align: center;
          font-family: Arial, sans-serif;
          padding: 20px;
          border-radius: 5px;
          border: 1px solid #cccccc;
          display: inline-block;
        }
          h3 {
          color: purple;
        }
          .question {
          font-style: italic;
        }
          .btns {
          display: flex;
          justify-content: space-around;
        }
          a {
          display: inline-block;
          padding: 10px 20px;
          border-radius: 5px;
          background: rebeccapurple;
          color: #ffffff;
          text-decoration: none;
          transition: all .5s ease;
        }
          a:hover {
          background: mediumpurple;
        }
        </style>
      </head>
      <body>
        <div class="survey">
          <div class="survey__content">
            <h3>I'd like our input</h3>
            <p>Please, answer the following question</p>
            <p class="question">${survey.body}</p>
            <div class="btns">
              <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
              <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
            </div>
          </div>
        </div>
      </body>
      </html>
  `;
};