import mongoose from "mongoose";

const { Schema, model } = mongoose;

const tableSchema = new Schema({
  column1: {
    type: String,
    required: true,
  },
  column2: {
    type: String,
    required: true,
  },
  column3: {
    type: String,
    required: true,
  },
  column4: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
  },
});

export default model("Table", tableSchema);
