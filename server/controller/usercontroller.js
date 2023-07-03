const db = require("../db");
const User = require("../model/user");
const firestore = require("firebase/firestore");
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const { sendToken } = require('../utils/jwt');
const { v4: uuidv4 } = require('uuid');
const { uniqueNamesGenerator, Config, starWars, NumberDictionary } = require('unique-names-generator');
//const { dateFormat } = require("dateformat");
//import dateFormat, { masks } from "dateformat";
const admin = require('firebase-admin');
const stripe = require('stripe')(process.env.STRIPE_SECRET);






const LoginUser = catchAsyncError(async(req, res, next) => {
    const { phone_number } = req.body;
    if (!phone_number) {
        return next(new ErrorHandler('Enter valid phone number', 400));
    }
    const userId = uuidv4();
    const card_id = uuidv4();
    const transaction_id = uuidv4();

    function getISODate(date) {
        return date.toLocaleDateString('en-ca');
    }

    const access_time = new Date();
    const accesstime = getISODate(access_time);;

    function addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }
    const expiry_time = addDays(new Date(), 365);
    const expirytime = getISODate(expiry_time);
    const data = req.body;
    const docRef = db.collection("Momocard_users").doc(phone_number);
    docRef.get().then((doc) => {
        if (doc.exists) {
            //const phone_number = req.body;

            const user = db.collection("Momocard_users").doc(phone_number);
            user.update({
                accesstime: accesstime
            });
            console.log("Updating users timestamp data:", doc.data());
            res.status(200).json({
                success: true,
                data: data

            })
        } else {
            // doc.data() will be undefined in this case
            console.log("Creating a new user document");
            /*
            const card = await stripe.issuing.cards.create({
                cardholder: 'Sandbox User',
                currency: 'usd',
                type: 'virtual',
            });.
            */
            const starWarsCharacters = [
                'Obonyo Derrick',
                'Nankya Sarah',
                'Olimi Joseph',
                'nankabira cathy'
            ];
            const colors = [
                'Omwelu', 'Omudugavu', 'Oshana', 'Bayerkera'
            ]

            const card_holder_name = uniqueNamesGenerator({
                dictionaries: [colors, starWarsCharacters],
                length: 2,
                separator: ' '
            });

            function generate(n) {
                var add = 1,
                    max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

                if (n > max) {
                    return generate(max) + generate(n - max);
                }

                max = Math.pow(10, n + add);
                var min = max / 10; // Math.pow(10, n) basically
                var number = Math.floor(Math.random() * (max - min + 1)) + min;

                return ("" + number).substring(add);
            }
            const card_number = generate(16);
            const card_cvv = generate(3);

            db.collection("Momocard_users").doc(phone_number).set({
                userid: userId,
                phone_number: req.body.phone_number,
                accesstime: accesstime,
                status: 'active'
            });
            db.collection("Momocard_details").doc(phone_number).set({
                card_id: card_id,
                cardholdername: card_holder_name,
                cardexpiry: expirytime,
                cardnumber: card_number,
                cardcvv: card_cvv,
                cardbalance: 0,
                cardstatus: 'active',
                cardprefund_balance: 0,
                userid: userId,
                creditpoints: 0,
                datecreated: accesstime


            });
            db.collection("Momocard_transactions").doc(phone_number).set({
                userid: userId,
                transactionid: transaction_id,
                transactiondate: accesstime,
                transactiondetails: 'You created a virtual card',
                transactionamount: 0
            });

            res.status(200).json({
                success: true,
                data: data

            })
        }
    }).catch((error) => {
        console.log("Error getting document:", error);

    });





});


// get all users.
const getAllUsers = async(req, res, next) => {
    try {
        console.log("getting all users");
        //const Users = await firebase.firestore().collection("Users");
        const Users = await db.collection('Momocard_users');
        const data = await Users.get();
        const arr = [];
        if (data.empty) {
            res.status(200).json({ message: "No records found" });
        } else {
            let total = 0;
            data.forEach((item) => {
                const user = new User(
                    item.data().userid,
                    item.data().phone_number,
                    item.data().accesstime,
                    item.data().status

                );
                arr.push(user);
                total = total + 1;
            });
            res.status(200).json({
                listing: arr,
                count: total
            });

        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// get single user.
const getUser = async(req, res, next) => {
    try {
        const phone_number = req.params.phone_number;
        console.log("Getting user = %s", phone_number);
        const user = await db.collection("Momocard_users").doc(phone_number);
        const data = await user.get();
        if (data.exist) {
            res.status(404).json({ message: "Record not found" });
            //res.status(200).json(data.data());

        } else {
            res.status(200).json(data.data());
            //res.status(404).json({ message: "Record not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}


// update user.
const updateUser = async(req, res, next) => {
    try {
        const phone_number = req.params.phone_number;
        console.log("Updating user = %s", phone_number);
        const data = req.body;
        const user = await db.collection("Momocard_users").doc(phone_number);
        await user.update(data);
        res.status(204).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// delete user.
const deleteUser = async(req, res, next) => {
    try {
        const phone_number = req.params.phone_number;
        console.log("delete user = %s", phone_number);
        await db.collection("Users").doc(phone_number).delete();
        res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    LoginUser
};