const fs = require("fs");
const { chalkClient, isDir, formatDate } = require("./index.js");

/**
 * @param [fileName="null"] {String} Arquivo onde ocorreu o erro
 * @param [IDs] {Object} IDs involvidos
 * @param [IDs.server=0] {String|Number} ID do server
 * @param [IDs.user=0] {String|Number} ID do usuario
 * @param [IDs.msg=0] {String|Number} ID da mensagem
 */
function generateErrorID(fileName = "null", IDs = { server: 0, user: 0, msg: 0 }) {
  let errorID = `${fileName}${formatDate(new Date())}${IDs.server}${IDs.user}${IDs.msg}`;
  errorID = errorID.split('')
  errorID.map(c => {
    errorID[Math.floor(Math.random() * (15 - 0))] = c 
  });
  return errorID.join('').slice(0, 15);
}

module.exports = {
  /**
   * 
   * @param {Error} err 
   * @param {String} [fileName=""]
   * @returns {void}
   */
  newError: function (err, fileName = "") {
    if (!err) return;

    // Check if the "errors" folder exist, if not create it
    if(!fs.existsSync("errors")) fs.mkdirSync("errors");



  },

  /*
  newError: function () {
    if (!err) return;
    let folder = fs.existsSync("./errors");
    fileName = fileName.split(".")[0];
    let errorFileName = `${fileName ? fileName + "_" : ""}${format(
      new Date() - 10800000,
      "dd:MM:yyyy_HH:mm:ss"
    )}.json`;
    let dados = {
      errorID: generateErrorID(fileName, IDs),
      msdate: Number(new Date()),
      date: module.exports.formatDate(new Date()),
      msg: err.message || null,
      stack: err.stack || null,
      IDs: IDs || null,
      thisfile: errorFileName,
    };
    if (!folder) {
      fs.mkdirSync("/errors");
    }
    fs.writeFileSync(
      `/errors/${errorFileName}`,
      JSON.stringify(dados, null, 2),
      { encoding: "utf8" }
    );
    return `${chalkClient.error(
      "Erro detectado!"
    )}\nVeja o log em: ./errors/${errorFileName}`;
  },
  */
};
