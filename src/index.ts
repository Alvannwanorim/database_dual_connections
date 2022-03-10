import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import { LastSyncTime } from "./entity/last_sync_time";
import { User } from "./entity/User";
const cron = require('node-cron');
const connectToDatabase = async () => {
    try {
        let connection = await createConnection('test');
        console.log("connected to the database");
        let connection1 = await createConnection('test1');
        console.log("connected to the database test1");
    } catch (err) {
        console.log(err.message);
    }
}
connectToDatabase()

const createLastSyncTime = async () => {
    const lastSyncTimeRepository = getConnection("test1").getRepository(LastSyncTime)

    const last_sync_time = await lastSyncTimeRepository.find()
}
const createTestendPoint2 = async () => {
    const userRepository = getConnection("test").getRepository(User)
    const userRepository2 = getConnection("test1").getRepository(User)

    const users = await userRepository.find()
    for (let user of users) {
        const createdUser = await userRepository2.save({ firstName: user.firstName, lastName: user.lastName, age: user.age })
        console.log(createdUser);
    }

}

function startSchedule() {
    cron.schedule('* * * * *', () => {
        console.log("testing!!!!!");
        createTestendPoint2()

    }, {});
}
startSchedule()