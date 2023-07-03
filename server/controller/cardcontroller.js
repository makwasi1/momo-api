const db = require("../db");
const User = require("../model/card");
const {
    firestore,
    increment
} = require("firebase/firestore");
const admin = require('firebase-admin');

const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const { sendToken } = require('../utils/jwt');
const momo = require("mtn-momo");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const { Collections } = momo.create({
    //callbackHost: config.url,
    callbackHost: 'https://webhook.site/fb1dfaf1-6f44-4b36-9a30-ed2acb6eadac'
});
const collections = Collections({
    userSecret: process.env.userSecret,
    userId: process.env.userId,
    primaryKey: process.env.primarykey
});
const externalId = uuidv4();


//top-up account.
const addfunds = catchAsyncError(async(req, res, next) => {

    try {
        collections.requestToPay({
                //data: req.body
                amount: paymentfee,
                currency: "EUR",
                externalId: externalId,
                payer: {
                    partyIdType: "MSISDN",
                    partyId: phone_number
                },
                payerMessage: "Topping up your virtual card",
                payeeNote: "Thanks for using Momo."



            })
            .then(transactionId => {
                console.log({ transactionId });
                // Get transaction status
                return collections.getTransaction(transactionId);
            })
            .then(transaction => {
                console.log({ transaction });
                const incrementbal = admin.firestore.FieldValue.increment(paymentfee);
                // const incrementpoints = admin.firestore.FieldValue.increment(0.5);
                const goodusagepoints = admin.firestore.FieldValue.increment(1.5);
                const creditpoint = admin.firestore.FieldValue.increment(0.5);
                const zerobalance = 0;
                const fund = db.collection("Momocard_details").doc(phone_number);
                return fund
                    .get()
                    .then(doc => {
                        if (!doc.exists) {
                            console.log('No such User document!');
                            throw new Error('No such User document!');
                        } else {
                            console.log("Updating card details.");
                            const currentprefundbalance = doc.data().cardprefund_balance;
                            // activate top-up.
                            if (currentprefundbalance == zerobalance) {
                                fund.update({
                                    cardbalance: incrementbal,
                                    creditpoints: creditpoint,
                                });
                            }
                            // pay credit and top-up balance.
                            if (currentprefundbalance > zerobalance && paymentfee > currentprefundbalance) {
                                const differenceinbalance = paymentfee - currentprefundbalance;
                                const adddiffernceinbalance = admin.firestore.FieldValue.increment(differenceinbalance);
                                fund.update({
                                    cardbalance: adddiffernceinbalance,
                                    cardprefund_balance: 0,
                                    creditpoints: goodusagepoints

                                });

                            }
                            // pay-credit.
                            if (currentprefundbalance == paymentfee) {
                                fund.update({
                                    cardbalance: 0,
                                    cardprefund_balance: 0,
                                    creditpoints: creditpoint


                                });
                            }

                            return true;


                        }

                    })




            })
            .catch(error => {
                console.log(error);
            });


        res.status(201).json({ "Successful": "message" });

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
});



// get card details.
const carddetails = catchAsyncError(async(req, res, next) => {
    try {
        const phone_number = req.params.phone_number;
        console.log("Getting user = %s", phone_number);
        const card = await db.collection("Momocard_details").doc(phone_number);
        const data = await card.get();
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
});

//get card transaction history.
const cardtransaction = catchAsyncError(async(req, res, next) => {
    try {
        const phone_number = req.params.phone_number;
        console.log("Getting user = %s", phone_number);
        const card = await db.collection("Momocard_transactions").doc(phone_number);
        const data = await card.get();
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
});

//updatecarddetails.
const updatecardstatus = catchAsyncError(async(req, res, next) => {
    try {
        const phone_number = req.params.phone_number;
        console.log("Updating user = %s", phone_number);
        const data = req.body;
        const card = await db.collection("Momocard_details").doc(phone_number);
        return card
            .get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such Card details!');
                    throw new Error('No such User document!');
                } else {
                    const status = doc.data().cardstatus;
                    if (status == 'active') {
                        card.update({ cardstatus: 'inactive' });
                        res.status(204).json({ message: "User updated successfully" });
                    }
                    if (status == 'inactive') {
                        card.update({ cardstatus: 'active' });
                        res.status(204).json({ message: "User updated successfully" });

                    }
                }

            });


    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});



// request prefund amount.
const requestprefund = catchAsyncError(async(req, res, next) => {
    try {
        const phone_number = req.params.phone_number;
        console.log("Requesting pre-fund for buy now pay later = %s", phone_number);
        const card = await db.collection("Momocard_details").doc(phone_number);
        return card
            .get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such Card details!');
                    res.status(404).json({
                        message: 'No such Card details'
                    });
                } else {
                    const creditpoints = doc.data().creditpoints;
                    const datecreated = doc.data().datecreated;
                    const convertdatecreatedtodate = new Date(datecreated);
                    const dateofrequest = new Date();
                    const time = 86400000;
                    const basecurrency = 100;
                    const getdatedifference = Math.floor((dateofrequest - convertdatecreatedtodate) / time);
                    console.log(datecreated, dateofrequest, convertdatecreatedtodate, getdatedifference);
                    const newcardprefund_balance = ((basecurrency) * (creditpoints)) * (getdatedifference);


                    card.update({ cardprefund_balance: newcardprefund_balance });
                    res.status(200).json({
                        newcardprefund_balance
                    });


                }

            });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = { addfunds, carddetails, updatecardstatus, requestprefund, cardtransaction }