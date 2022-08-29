module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET',"8up87XHnodVybF8jgzLD6g=="),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT',["8up87XHnodVybF8jgzLD6g=="]),
  },
});
