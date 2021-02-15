const connection = require("../../../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Categorym = connection.import("../../../models/category_mcqs");
const Queries = require("../../../config/sequelize_queries");


const insertCategorym = async (req, res) => {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(404).json({
        ack: 0,
        msg: "Please Enter Inputs."
      });
    } else {
      let item = {
        name: req.body.name
      };

      let add = await Queries.queries(Categorym, item, null, 1, 0, 0);

      res.status(200).json({
        ack: 1,
        msg: "Category Name.",
        data: add
      });
    }
  } catch (e) {
    res.status(404).json({
      ack: 0,
      msg: "There seems to be an error. Please contact us at contact.thecampusstreet@gmail.com.",
      error: e.message
    });
  }
};

const findCategorym = async (req, res) => {
  try {
    let id = req.params.id;
    let where = {
      where: {
        id: id,
      
      },
      raw: true
    };
    let find = await Queries.queries(
      Categorym,
      null,
      id == 0 ? null : where,
      0,
      1,
      0
    );

    res.status(200).json({
      ack: 1,
      msg: "Category Name.",
      data: find
    });
  } catch (e) {
    res.status(404).json({
      ack: 0,
      msg: "There seems to be an error. Please contact us at contact.thecampusstreet@gmail.com.",
      error: e.message
    });
  }
};

module.exports = {
  insertCategorym: insertCategorym,
  findCategorym: findCategorym
};
