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
    //dbUri: "postgres://localhost:27017/rest-api-tutorial",
};