const genToken = (user, statusCode, res)=>{
    const token = user.getJWTToken();
    // console.log(user);
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES*24*60*60*1000
        ),
        httpOnly:true,
    }

    // res.status(statusCode).cookie('token', token,options).cookie('user', user).json({ 
    //     success: true,
    //     user,
    //     sendToken,
    // })
    res.status(statusCode).cookie('token', token,options).cookie('user', user).redirect('/api/v1/me');

}

module.exports = genToken
