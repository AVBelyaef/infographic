Ссылка на страницу в конфу добавляется в html. Необходимо скопировать id страницы конфы(https://sibedge.atlassian.net/wiki/spaces/allsibedge/pages/2282913799) и добавить в атрибут data-id="2282913799"

Сгенерировать токен(https://developer.atlassian.com/cloud/confluence/basic-auth-for-rest-apis/)
To use basic auth headers, perform the following steps:
1.Generate an API Token for your Atlassian Account: https://id.atlassian.com/manage/api-tokens
2.Build a string of the form your_email@domain.com:your_user_api_token.
3.You'll need to encode your authorization credentials to base64. There are online tools (i.e., https://www.base64encode.net/) that you can use to create your base64 encoded string. For example, your_email@domain.com:your_user_api_token base64 encoded is eW91cl9lbWFpbEBkb21haW4uY29tOnlvdXJfdXNlcl9hcGlfdG9rZW4=
4.Supply an Authorization header with content Basic followed by the encoded string. Example: Authorization: Basic eW91cl9lbWFpbEBkb21haW4uY29tOnlvdXJfdXNlcl9hcGlfdG9rZW4=

Создать файл переменных окружения .env
PORT=5000
URL="https://sibedge.atlassian.net/wiki/rest/api/content/"
TOKEN="1234567890" //сгенерить свой

### запуск

npm install

npm start
