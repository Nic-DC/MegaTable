import { Router } from "express";
import { Random } from "random-js";
import Table from "./tableModel.js";
const insertRecordsRoute = new Router();
const random = new Random();

const generateRecords = (count) => {
  const records = [];

  for (let i = 0; i < count; i++) {
    records.push({
      column1: random.string(10), // Generate a random string of length 10
      column2: random.string(10),
      column3: random.string(10),
      column4: random.string(10),
      priority: random.integer(1, 3), // Generate a random integer between 1 and 3
    });
  }

  return records;
};

insertRecordsRoute.post("/random", async (req, res, next) => {
  try {
    const recordsToInsert = generateRecords(10);
    await Table.insertMany(recordsToInsert);
    res.status(201).send("Data inserted successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default insertRecordsRoute;
