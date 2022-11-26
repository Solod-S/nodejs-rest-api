const { listContacts } = require("../../models/contacts");

const getAll = async (req, res) => {
  const result = await listContacts();
  res.status(201).json({
    status: "succes",
    code: 201,
    result,
  });
};

module.exports = getAll;
