import mongoose from "mongoose";

const { Schema, model } = mongoose;

const tableSchema = new Schema({
  column1: { type: String, required: false, default: "" },
  column2: { type: String, required: false, default: "" },
  column3: { type: String, required: false, default: "" },
  column4: { type: String, required: false, default: "" },
  column5: { type: String, required: false, default: "" },
});

export default model("Table", tableSchema);
