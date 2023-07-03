const nodemon = require('nodemon');

// create jwt token and save as a cookie
exports.sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    };
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            data: {
                id: User.id,
                phone_number: user.phone_number,
                status: user.status

            },
        });
};