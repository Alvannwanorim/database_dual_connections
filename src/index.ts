import "reflect-metadata";
import { createConnections, getConnection } from "typeorm";
import ClearanceMembers from "./entity/clearance_members";
import ClearanceTgs from "./entity/clearance_tgs";
const cron = require("node-cron");

const connectToDatabase = async () => {
  try {
    await createConnections();
    console.log("Connections established");
  } catch (err) {
    console.log(err.message);
  }
};
connectToDatabase();

const copyData = async () => {
  const mysqlmemberRepo =
    getConnection("mysql").getRepository(ClearanceMembers); //mysql members table
  const mysqltgRepo = getConnection("mysql").getRepository(ClearanceTgs); //mysql tgs table
  const postgrestgRepo = getConnection("default").getRepository(ClearanceTgs); //postgres tgs table
  const postgresmemberRepo =
    getConnection("default").getRepository(ClearanceMembers); //postgres member table
  const tgs = await mysqltgRepo.find();
  console.log(tgs[1]);
  for (let tg of tgs) {
    const createdTg = await postgrestgRepo.save({ ...tg });
    console.log(createdTg);
  }
};

cron.schedule(
  "0 11 14 * * *",
  () => {
    copyData();
    console.log("testing!!!!!");
  },
  {
    timezone: "Africa/Lagos",
  }
);
