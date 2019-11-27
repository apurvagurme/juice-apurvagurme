const fs = require("fs");

const getSaveArray = function(recordsOfEmployee) {
  let records = [recordsOfEmployee];
  const heading = [
    "Employee ID",
    " " + "Beverage",
    " " + "Quantity",
    " " + "Date"
  ];
  records.unshift(heading);
  records.unshift(["Transaction Recorded:"]);
  return records;
};

const saveEmpRecord = function(cmdLineArgsObj, date, contents, funcRef, path) {
  let parsedContents = JSON.parse(contents);
  let transactionRecord = cmdLineArgsObj;
  let empId = cmdLineArgsObj["--empId"];
  if (!parsedContents.hasOwnProperty(empId)) {
    parsedContents[empId] = [];
  }
  delete transactionRecord["action"];
  transactionRecord["date"] = date;
  parsedContents[empId].push(transactionRecord);
  funcRef(path, parsedContents);
  return transactionRecord;
};

const saveRecordToDatabase = function(path, parsedContents) {
  return JSON.stringify(
    fs.writeFileSync(path, JSON.stringify(parsedContents), "utf8")
  );
};

exports.getSaveArray = getSaveArray;
exports.saveEmpRecord = saveEmpRecord;
exports.saveRecordToDatabase = saveRecordToDatabase;
