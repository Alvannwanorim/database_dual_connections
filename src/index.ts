import "reflect-metadata";
import { Connection, createConnections, getConnection } from "typeorm";
import DateTest from "./entity/datetest";
import User from "./entity/User";
const cron = require("node-cron");

const connectToDatabase = async () => {
  try {
    let connections: Connection[] = await createConnections();
    await connections[0].runMigrations();
    await connections[1].runMigrations();
  } catch (err) {
    console.log(err.message);
  }
};

connectToDatabase();

//Testing out typeorm query builder
async function testQueryBuilder() {
  const postgresConnection = await getConnection("postgresdb");
  const result = await postgresConnection
    .getRepository(DateTest)
    .createQueryBuilder("row")
    .select()
    .andWhere("row.created_at < :date", {
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    })
    .getMany();

  console.log(result);
}

//trying to copy data using raw sql as opposed to typeorm repository mapper
// this function fetches data from my mysql mock table, then copies it to postgres
const copyMockData = async () => {
  try {
    const mysqlConnection = await getConnection("mysqldb");
    const postgresConnection = await getConnection("postgresdb");

    // query mysql mock_data table to get 1000 records
    const mysqlQueryResult = await mysqlConnection.query(
      `SELECT * FROM mock_data`
    );

    //loop through data from query result
    for (let eachRow of mysqlQueryResult) {
      //make each result object into an array of keys and another array of values
      const keyArray: string[] = Object.keys(eachRow);
      const dataArray: string[] = Object.values(eachRow);

      // cover keys in double quotes which will stand for column names
      const tableKeys = keyArray.map((a) => JSON.stringify(a)).join(",");

      // cover values in single quotes which will stand for column values escaping special characters and also considering data types
      const tableValues = dataArray
        .map((a) =>
          Number(a.toString().replace(/[-]/g, ""))
            ? a
            : `'${a.replace(/[']/g, "''")}'`
        )
        .join(",");

      //check if any data already exists, then updates rather than insert
      const rowExists = await postgresConnection.query(
        `SELECT * FROM "user" WHERE "id" = ${eachRow.id}`
      );
      if (rowExists.length) {
        postgresConnection.query(
          `UPDATE "user"
           SET "first_name" = '${eachRow.first_name.replace("'", "''")}',
           "last_name" = '${eachRow.last_name.replace("'", "''")}',
           "email"='${eachRow.email}',
           "gender"='${eachRow.gender}',
           "ip_address"='${eachRow.ip_address}'
           WHERE "id" = ${eachRow.id}
           `
        );
        console.log("updated");
      }
      //if row does not exist, insert
      else {
        postgresConnection.query(
          `INSERT INTO "user"(${tableKeys}) VALUES(${tableValues})`
        );
        console.log("inserted");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

//cron scheduler to run every second minute of the 18th hour in Lagos Nigeria time
cron.schedule(
  "02 * 18 * * *",
  () => {
    // copyMockData();
    // testQueryBuilder();
    console.log("testing!!!!!");
  },
  {
    timezone: "Africa/Lagos",
  }
);
