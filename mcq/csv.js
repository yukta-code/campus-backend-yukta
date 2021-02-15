const connection = require("../../../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Questionm = connection.import("../../../models/question_mcqs");

const Queries = require("../../../config/sequelize_queries");
const fs = require("fs");
const csv = require("fast-csv");

const uploade = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let questions = [];
    let path = __basedir  + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        questions.push(row);
      })
      .on("end", () => {
        Questionm.bulkCreate(questions)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getQuestionsByCsv = (req, res) => {
  Questionm.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

module.exports = {
  uploade,
  getQuestionsByCsv
};