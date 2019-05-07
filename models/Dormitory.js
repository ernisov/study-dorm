const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DormitorySchema = new Schema({
  number: Number,
  commandant: Schema.Types.ObjectId,
  floors: {
    type: Number,
    required: true,
    min: 1
  }
});
