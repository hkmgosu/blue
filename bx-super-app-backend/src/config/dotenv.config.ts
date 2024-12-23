export default () => ({
  mongoConnection: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_USERPASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  test: process.env.TEST,
  redirectUri: process.env.REDIRECT_URI,
});
