const User = require('../models/user');
const Member = require('../models/members');
const bycrypt=require('bcryptjs');

exports.onAddingUser = (req, res, next) => {
    console.log('in User middleware', req.body);
    const id = req.body._id;
    const name = req.body.name;
    const email = req.body.email;
    const user = new User(name, email, id);

    user.save().then(() => {
        res.send(JSON.stringify({
            success: true,
            data: {
                msg: "User added successfully"
            },
            error: null
        }));
    }).catch((err) => {
        res.send(JSON.stringify({
            success: false,
            data: null,
            error: err
        }))
    });
};

exports.getUsers = (req, res, next) => {
    User.fetchAll().then((rows) => {
        console.log('rows', rows);
        res.send(JSON.stringify({
            success: true,
            data: rows,
            error: null
        }));
    }).catch(err => {
        res.send(JSON.stringify({
            success: false,
            data: null,
            error: err
        }));
    }
    );
};

exports.onGettingUserById = (req, res, next) => {
    const userId = req.params.id;
    console.log('pp', userId)
    User.fetchById(userId).then(user => {
        // console.log('in controller',product)
        res.send(JSON.stringify({
            success: true,
            data: user,
            error: null
        }));
    }).catch(err => {
        res.send(JSON.stringify({
            success: false,
            data: null,
            error: err
        }));
    }
    );
}

exports.onDeletingUser = (req, res, next) => {
    const userId = req.params.id;
    User.deleteById(userId).then(() => {
        res.send(JSON.stringify({
            success: true,
            data: {
                msg: "User Deleted Successfully"
            },
            error: null
        }));
    }).catch(err => {
        res.send(JSON.stringify({
            success: false,
            data: null,
            error: err
        }));
    }
    );
}

exports.onLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('cred', password, email)
    Member.findOne({ email: email }).then((user)=>{
        if(!user){
            req.session.isLoggedIn = false;
            res.send(JSON.stringify({
                success: false,
                data: null,
                error: {
                    msg:"User Not Found"
                }
            }));
        }
        req.session.isLoggedIn = true;
        res.send(JSON.stringify({
            success: true,
            data: {
                msg: "User Loggedin  Successfully"
            },
            error: null
        }));
    }).catch(err => console.log(err))
}

exports.onAddingMember = (req, res, next) => {
    console.log('in Member middleware', req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    Member.findOne({ email: email }).then(
        user => {
            if (user) {
                res.send(JSON.stringify({
                    success: false,
                    data: null,
                    error: {
                        msg: "User with same email already exists !!"
                    }
                }))
            }
                return bycrypt.hash(password,12).then((hashPassword)=>{
                    const member = new Member({ name: name, email: email, password: hashPassword });
                    return member.save().then(() => {
                        res.send(JSON.stringify({
                            success: true,
                            data: {
                                msg: "Member signed up successfully"
                            },
                            error: null
                        }));
                    }).catch((err) => {
                        res.send(JSON.stringify({
                            success: false,
                            data: null,
                            error: err
                        }))
                    });
                })
        }
    ).catch(err => console.log(err))
};

