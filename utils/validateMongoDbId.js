const mongoose = require("mongoose");
const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error(`Invalid or null id: this is the id ${id}`);
};
module.exports = validateMongoDbId;