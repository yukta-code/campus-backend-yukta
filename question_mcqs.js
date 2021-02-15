/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('question_mcqs', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    question_name: {
      type: DataTypes.STRING(225),
      allowNull: false
    },
    complexity_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    option_a: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    option_b: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    option_c: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    option_d: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'question_mcqs'
  });
};
