const jwt = require('jsonwebtoken');
class User {
    constructor(id, phone_number, accesstime, status) {
        this.id = id;
        this.phone_number = phone_number;
        this.accesstime = accesstime;
        this.status = status

    }

}
//get json token.


module.exports = User;