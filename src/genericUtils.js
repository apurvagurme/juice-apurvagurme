const fs = require('fs');

const getProcess = function(object, action, defaultValue) {
  if (object.hasOwnProperty(action)) {
    return object[action];
  }
  return defaultValue;
};

const getString = function(recordOfTransaction) {
  let records = recordOfTransaction;
  return records.join('\n');
};

const makeArrayToObj = function(array) {
  if (array.length == 0) {
    return {};
  }
  let prevObj = {};
  prevObj[array[0]] = array[1];
  return Object.assign(prevObj, makeArrayToObj(array.slice(2)));
};

const saveRecordToDatabase = function(path, parsedContents) {
  fs.writeFileSync(path, JSON.stringify(parsedContents), 'utf8');
};

exports.saveRecordToDatabase = saveRecordToDatabase;
exports.makeArrayToObj = makeArrayToObj;
exports.getString = getString;
exports.getProcess = getProcess;
