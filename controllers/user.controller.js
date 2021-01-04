const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const passport = require('passport');

const jwt = require("jsonwebtoken");

module.exports.getAllUser = async (req, res) => {
	User.find({}, (err, users) => {
		res.json(users);
	});
};
module.exports.postUserData = async (req, res) => {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: await bcrypt.hash(req.body.password, 10)
	});
	newUser.save(async (err) => {
    if(err) {
      console.log(err)
    }else{
		res.send(await User.find({}))}
	});
};
module.exports.putUserData = async (req, res) => {
	let user = await User.findById(req.params.id);
	user.name = req.body.name;
	user.email = req.body.email;
	// user.password = await bcrypt.hash(req.body.password, 10);
	user.save(async () => {
		res.json(await User.find({}));
	});
};

module.exports.authToken = async (req, res, next)=>{
    const token = req.header('x-auth-token')
    const verifiedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
}

module.exports.deleteUserData = async (req, res) => {
	User.findByIdAndRemove(req.params.id, err => {
		res.json({ message: req.params.id+' deleted' });
	});
};
//module.exports.testData = async (req,res)=>res.send("ok")


module.exports.login = (req, res, next) => {
  const token = jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN_SECRET);
  console.log(token)
  passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	})(req, res, next);
};

module.exports.logout = (req, res)=>{
   
  req.logout();
  res.redirect('/');
}