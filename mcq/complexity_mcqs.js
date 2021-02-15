const connection = require("../../../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Complexitym = connection.import("../../../models/complexity_mcqs");
const Queries = require("../../../config/sequelize_queries");


const insertComplexitym = async (req, res) => {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(404).json({
        ack: 0,
        msg: "Please Enter Inputs."
      });
    } else {
      let item = {
        question_id: req.body.question_id,
        category_id: req.body.category_id,
        complexity_name: req.body.complexity_name

      };

      let add = await Queries.queries(Complexitym, item, null, 1, 0, 0);

      res.status(200).json({
        ack: 1,
        msg: "Complexity Name.",
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

const findComplexitym = async (req, res) => {
  try {
    let id = req.params.id;
    let where = {
      where: {
        id: id,
    
      },
      raw: true
    };
    let find = await Queries.queries(
      Complexitym,
      null,
      id == 0 ? null : where,
      0,
      1,
      0
    );

    res.status(200).json({
      ack: 1,
      msg: "Complexity Name.",
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
  insertComplexitym: insertComplexitym,
  findComplexitym: findComplexitym
};
