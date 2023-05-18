const DBConnection = require("../database");
const bcrypt = require("bcryptjs");

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data.email_address);
        if (isEmailExist) {
            reject(`This email "${data.email_address}" has already exist. Please choose an other email`);
        } else {
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                first_name: data.first_name,
                email_address: data.email_address,
                password: bcrypt.hashSync(data.password, salt),
            };

            //create a new account
            DBConnection.query(
                'INSERT INTO registration set ? ', userItem,
                function(err, rows) {
                    if (err) {
                        reject(false)
                    }
                    resolve("Create a new user successful");
                }
            );
        }
    });
};

let checkExistEmail = (email) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `registration` WHERE `email_address` = ?  ', email,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    createNewUser: createNewUser
};