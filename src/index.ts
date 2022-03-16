import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import { User } from "./entity/User";
const cron = require("node-cron");

const connectToDatabase = async () => {
  try {
    let mysqlConnection = await createConnection("mysqldb");
    if (mysqlConnection) console.log("connected to the mysql database");
    let postgresConnection = await createConnection("postgresdb");
    if (postgresConnection) console.log("connected to the postgres database");
  } catch (err) {
    console.log(err.message);
  }
};

connectToDatabase();

const copyMockData = async () => {
  try {
    const mysqlConnection = await getConnection("mysqldb");
    const postgresConnection = await getConnection("postgresdb");

    const mysqlQueryResult = await mysqlConnection.query(
      `SELECT * FROM mock_data`
    );
    for (let eachRow of mysqlQueryResult) {
      const keyArray: string[] = Object.keys(eachRow);
      const dataArray: string[] = Object.values(eachRow);

      const tableKeys = keyArray.map((a) => JSON.stringify(a)).join(",");
      const tableValues = dataArray
        .map((a) =>
          Number(a.toString().replace(/[-]/g, ""))
            ? a
            : `'${a.replace(/[']/, "")}'`
        )
        .join(",");
      const rowExists = await postgresConnection.query(
        `SELECT * FROM "user" WHERE "id" = ${eachRow.id}`
      );
      if (rowExists.length) {
        postgresConnection.query(
          `UPDATE "user"
           SET "first_name" = '${eachRow.first_name}',
           "last_name" = '${eachRow.last_name}',
           "email"='${eachRow.email}',
           "gender"='${eachRow.gender}',
           "ip_address"='${eachRow.ip_address}'
           WHERE "id" = ${eachRow.id}
           `
        );
      } else {
        postgresConnection.query(
          `INSERT INTO "user"(${tableKeys}) VALUES(${tableValues})`
        );
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

setTimeout(() => copyMockData(), 3000);

// function startSchedule() {
//     cron.schedule('* * * * *', () => {
//         console.log("testing!!!!!");
//         createTestendPoint2()

//     }, {});
// }
// startSchedule()
