const connection = require("../../../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Questionm = connection.import("../../../models/question_mcqs");
const Queries = require("../../../config/sequelize_queries");


const insertQuestionm = async (req, res) => {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(404).json({
        ack: 0,
        msg: "Please Enter Inputs."
      });
    } else {
      let item = {
        question_name: req.body.question_name,
        complexity_id: req.body.complexity_id,
        option_a: req.body.option_a,
        option_b: req.body.option_b,
        option_c: req.body.option_c,
        option_d: req.body.option_d,
        category_id: req.body.category_id,
      };

      let add = await Queries.queries(Questionm, item, null, 1, 0, 0);

      res.status(200).json({
        ack: 1,
        msg: "Question Name.",
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
//  id: req.body.id,
//       question_name: req.body.question_name,
//       complexity_id: req.body.complexity_id,
//       option_a: req.body.option_a,
//       option_b: req.body.option_b,
//       option_c: req.body.option_c,
//       option_d: req.body.option_d,
//       category_id: req.body.category_id,
const findQuestionm = async (req, res) => {
  try {
    let getData = await Questionm.findAll({ order: Sequelize.literal('rand()') })
    // let find = await Queries.queries(Questionm);
    // const questions = await Question.find()
    res.status(200).json({
      ack: 1,
      msg: "Question Name.",
      data: getData
    });
  } catch (e) {
    res.status(404).json({
      ack: 0,
      msg: "There seems to be an error. Please contact us at contact.thecampusstreet@gmail.com.",
      error: e.message
    });
  }
};
const findbyCategoryandComplexityOfQuestionm = async (req, res) => {
 try {
    let category_id = req.params.category_id;
    let complexity_id=req.params.complexity_id;
    // let where = {
    //   where: {
    //     category_id: category_id,
    //     complexity_id:complexity_id
    //   },
    //   raw: true
    // };
    let getData = await Questionm.findAll({
      where: {
        category_id: category_id,
        complexity_id:complexity_id
      }
    },{ order: Sequelize.literal('rand()') })
    
    // let find = await Queries.queries(Questionm);
    // const questions = await Question.find()
    res.status(200).json({
      ack: 1,
      msg: "Question Name.",
      data: getData
    });
  } catch (e) {
    res.status(404).json({
      ack: 0,
      msg: "There seems to be an error. Please contact us at contact.thecampusstreet@gmail.com.",
      error: e.message
    });
  }
};
// let getData = await AdminNotifications.findAll({ where: attr, raw: true })
// res.status(200).json({ ack: 1, msg: 'Notification List', data: getData })
module.exports = {
    insertQuestionm  :insertQuestionm ,
  findQuestionm: findQuestionm,
  findbyCategoryandComplexityOfQuestionm :findbyCategoryandComplexityOfQuestionm
};
