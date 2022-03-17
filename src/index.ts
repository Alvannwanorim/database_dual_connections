import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import { Dummy } from "./entity/dummy";
import { LastSyncTime } from "./entity/last_sync_time";
import { MockData } from "./entity/mock_data";
import { User } from "./entity/User";
const cron = require('node-cron');
const connectToDatabase = async () => {
    try {
        let postgresConnection = await createConnection('postgres');
        console.log("connected to the postgres database");
        let mysqlConnection = await createConnection('mysql');
        console.log("connected to the mySql database ");
    } catch (err) {
        console.log(err.message);
    }
}
connectToDatabase()


const createTestendPoint2 = async () => {
    const userRepository = getConnection("mysql").getRepository(Dummy) //mock_data
    // const userRepository2 = getConnection("postgres").getRepository(Dummy)

    const users = await userRepository.find()
    console.log(users[1]);


    // for (let user of users) {
    //     const createdUser: MockData = await userRepository2.save({ ...user })
    //     console.log(createdUser);
    // }

}

// setTimeout(() => createTestendPoint2(), 3000)

function startSchedule() {
    cron.schedule('* * * * *', () => {
        console.log("testing!!!!!");
        createTestendPoint2()

    }, {});
}
startSchedule()