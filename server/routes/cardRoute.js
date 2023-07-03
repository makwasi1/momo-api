const express = require('express');
const { addfunds, requestprefund, updatecardstatus, carddetails, cardtransaction } = require('../controller/cardcontroller');
const router = express.Router();

router.post("/vcard/topup", addfunds);
router.get("/vcard/requestprefund/:phone_number", requestprefund);
router.put("/vcard/updatecardstatus/:phone_number", updatecardstatus);
router.get("/vcard/carddetails/:phone_number", carddetails);
router.get("/vcard/cardtransaction/:phone_number", cardtransaction);
module.exports = {
    routes: router,
}