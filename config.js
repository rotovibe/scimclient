const sqlHost = process.env.sqlHost || '165.227.109.102';
const sqlUser = process.env.sqlUser || 'root';
const sqlPswd = process.env.sqlPswd || 'secret';
const sqlDb = process.env.sqlDb || 'Atmosphere';
const multipleStatements = process.env.multipleStatements || true;

module.exports = {
    sql: {
        host: sqlHost,
        user: sqlUser,
        password: sqlPswd,
        database: sqlDb,
        multipleStatements: multipleStatements
    }
};