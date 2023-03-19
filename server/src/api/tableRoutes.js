import { Router } from "express";
import Table from "./tableModel.js";
import { getPdfReadableStream } from "../tools/pdf-tool.js";
import { pipeline } from "stream";

const tableRoutes = new Router();

// CREATE cell
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

// CREATE record
tableRoutes.post("/record", async (req, res, next) => {
  try {
    const { column1, column2, column3, column4, column5 } = req.body;

    if (
      column1 === undefined ||
      column2 === undefined ||
      column3 === undefined ||
      column4 === undefined ||
      column5 === undefined
    ) {
      return res.status(400).send("Missing values for one or more columns");
    }

    const newRow = new Table({
      column1,
      column2,
      column3,
      column4,
      column5,
    });

    await newRow.save();
    res.status(201).send(newRow);
  } catch (error) {
    next(error);
  }
});

// Read all records
tableRoutes.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const totalRecords = await Table.countDocuments();
    const records = await Table.find().skip(skip).limit(limit);
    res.status(200).send({ records, totalRecords });
  } catch (error) {
    next(error);
  }
});
// tableRoutes.get("/", async (req, res, next) => {
//   try {
//     const records = await Table.find();
//     res.status(200).send(records);
//   } catch (error) {
//     next(error);
//   }
// });

// UPDATE cell
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

// UPDATE record
tableRoutes.put("/:id/update-record", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const validColumns = ["column1", "column2", "column3", "column4", "column5"];

    for (const key of Object.keys(updates)) {
      if (!validColumns.includes(key)) {
        return res.status(400).send(`Invalid column name: ${key}`);
      }
    }

    const record = await Table.findById(id);

    if (!record) {
      return res.status(404).send("Record not found");
    }

    for (const key of Object.keys(updates)) {
      record[key] = updates[key];
    }

    await record.save();

    res.status(200).send({ message: "Cells updated successfully", record });
  } catch (error) {
    next(error);
  }
});

// DELETE cell
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

    record[columnName] = "";
    await record.save();

    res.status(200).send(record);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// DELETE record
tableRoutes.delete("/:id/delete-record", async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await Table.findByIdAndRemove(id);

    if (!record) {
      return res.status(404).send({ message: `Record with id: ${id} not found` });
    }

    res.send({ message: `Record successfully deleted!`, deletedRecordId: id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// PDF - download
tableRoutes.get("/pdf", async (req, res, next) => {
  try {
    const tableData = await Table.find();

    if (tableData) {
      res.setHeader("Content-Disposition", "attachment; table.pdf");

      const source = getPdfReadableStream(tableData);
      const destination = res;

      pipeline(source, destination, (err) => {
        if (err) console.log(err);
      });
    } else {
      console.log(`No table data found.`);
    }
  } catch (error) {
    next(error);
  }
});

export default tableRoutes;
