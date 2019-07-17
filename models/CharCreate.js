module.exports = function(sequelize, DataTypes) {
  var CharCreate = sequelize.define("CharCreate", {
    char_name: DataTypes.STRING,
    img: DataTypes.STRING,
    health:DataTypes.INTEGER,
    def:DataTypes.INTEGER,
    stren:DataTypes.INTEGER,
    xp:DataTypes.INTEGER
  });
  return CharCreate;
};