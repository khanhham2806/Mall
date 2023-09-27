const { db } = require("../db");
const connect = db();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

exports.getAccounts = async ({ username }) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Account WHERE Username = ?";
    connect.query(sql, username, async function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.registerAccount = async ({ username, password, fullname, email }) => {
  return new Promise((resolve, reject) => {
    const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);
    const newUser = {
      username: username,
      password: hashPassword,
      email: email,
      fullName: fullname,
    };
    let createUser = `INSERT INTO Account SET ?`;
    connect.query(createUser, newUser, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.updateRefreshToken = async ({ refreshToken, accountId }) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE Account SET ? WHERE AccountID = ?";
    const newUser = {
      refreshToken: refreshToken,
    };
    connect.query(sql, [newUser, accountId], function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.deleteAccount = async () => { };
