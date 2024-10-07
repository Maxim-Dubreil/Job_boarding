module.exports = {
    development: {
        username: 'root', // MySQL username
        password: null, // MySQL password or 'null' if none
        database: 'jobboard', // Your actual database name
        host: '127.0.0.1', // Keep as '127.0.0.1' for localhost
        dialect: 'mysql' // Use MySQL as your database
    },
    test: {
        username: 'root',
        password: null,
        database: 'jobboard_test', // Test database (optional)
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    production: {
        username: 'root',
        password: null,
        database: 'jobboard_prod', // Production database (optional)
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};