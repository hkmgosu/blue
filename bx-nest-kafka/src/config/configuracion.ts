export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.URL_MONGO_HOST}/?retryWrites=true&w=majority`,
    name: process.env.MONGO_DB_NAME,
    maxPoolSize: Number(process.env.URL_MAX_POOL_SIZE) || 5,
    socketTimeoutMS: Number(process.env.URL_SOCKET_TIMEOUT_MS) || 3000,
  },
  kafka: {
    brokers: process.env.BROKERS_KAFKA.split(','),
    username: process.env.USER_KAFKA,
    password: process.env.PASSWORD_KAFKA,
    topic: process.env.TOPIC_KAFKA,
    groupId: process.env.GROUP_ID_KAFKA,
  },
});
