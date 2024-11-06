const SettingGeneral= require("../../model/settingModel");
module.exports.settingGeneral = async (req, res, next) => {
  const settingGeneral = await SettingGeneral.findOne({});
  res.locals.settingGeneral = settingGeneral;
  next();
}