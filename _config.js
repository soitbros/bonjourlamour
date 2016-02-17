module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'my-precious',
  MONGOLAB_URI: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/bonbon-1',
  SALT_WORK_FACTOR: 10,
};
