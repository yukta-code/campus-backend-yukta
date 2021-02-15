/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('complexity_mcqs', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    complexity_name: {
      type: DataTypes.STRING(225),
      allowNull: true
    }
  }, {
    tableName: 'complexity_mcqs'
  });
};
