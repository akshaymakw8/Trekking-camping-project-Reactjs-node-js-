const { userModel } = require("../models");

const userQuery = async (filter, projection) => {
  let query = { email: filter.email };
  if (filter._id) {
    query._id = {$ne: filter._id}
  }
  const data = await userModel.findOne(query, projection);
  return data;
};

module.exports = {
  userQuery,
};
