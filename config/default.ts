export default {
    port: 1337,
    dbUri: "postgres://alptuna@localhost:27017/lawyer-app",
    dbConfig: {
        user: 'alptuna',
        password: 'harpeon', // It also works without password, I should handle this.
        host: 'localhost',
        port: 5432,
        database: 'lawyer-app',
      },
    accessTokenPrivateKey: "",
    refreshTokenPrivateKey: "",
    smtp: {
        user: "icqskc5mxzf3bwct@ethereal.email",
        pass: "mVSU79SbF3WmvGqy4V",
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
      },
    //dbUri: "postgres://localhost:27017/rest-api-tutorial",
};