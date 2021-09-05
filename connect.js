// module.exports.connect = function () {
//     const { Client } = require('pg');
//     const connectionString = 'postgres://postgres:Ngocduy1998@localhost:5432/db_facebag?ssl=true';
//     const client = new Client({
//         connectionString: connectionString,
//         connectionTimeoutMillis: 2000,
//         idleTimeoutMillis: 500,
//         max: 40
//     });
//     client.connect();
//     return client;
// }

module.exports.connect = function () {
    // const { Pool } = require('pg');
    // const connectionString = 'postgres://postgres:Ngocduy1998@localhost:5432/db_facebag?sslmode=disable';
    // const client = new Pool({
    //     connectionString: connectionString
       
    // });
    // client.connect();
    // return client;
}