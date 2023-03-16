import { Router } from "express";
import Table from "./tableModel.js";

const tableRoutes = new Router();

/* --- Create new cell --- */
tableRoutes.post("/", async (req, res, next) => {
  try {
    const { columnName, value } = req.body;

    if (!columnName || value === undefined) {
      return res.status(400).send("Missing column name or value");
    }

    const newRow = new Table({
      column1: columnName === "column1" ? value : "",
      column2: columnName === "column2" ? value : "",
      column3: columnName === "column3" ? value : "",
      column4: columnName === "column4" ? value : "",
      column5: columnName === "column5" ? value : "",
    });

    await newRow.save();
    res.status(201).send(newRow);
  } catch (error) {
    next(error);
  }
});

/* --- Read all records --- */
tableRoutes.get("/", async (req, res, next) => {
  try {
    const records = await Table.find();
    res.status(200).send(records);
  } catch (error) {
    next(error);
  }
});

/* --- Update cell --- */
tableRoutes.put("/:id/update-cell", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { columnName, newValue } = req.body;

    if (!columnName || newValue === undefined) {
      return res.status(400).send("Missing column name or new value");
    }

    const record = await Table.findById(id);

    if (!record) {
      return res.status(404).send("Record not found");
    }

    record[columnName] = newValue;
    await record.save();

    res.status(200).send({ message: "Cell updated successfully", record });
  } catch (error) {
    next(error);
  }
});

tableRoutes.delete("/:id/delete-cell", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { columnName } = req.body;

    if (!id || !columnName) {
      return res.status(400).send("Missing columnName");
    }

    const record = await Table.findById(id);

    if (!record) {
      return res.status(404).send("Record not found");
    }

    if (record[columnName] === undefined) {
      return res.status(400).send("Invalid column name");
    }

    record[columnName] = ""; // Clear the cell value
    await record.save();

    res.status(200).send(record);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default tableRoutes;
