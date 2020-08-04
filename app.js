var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require("./models/user");

//mongodb + srv://test1:bluesky6048@cluster0.og4ps.mongodb.net/studentdb?retryWrites=true&w=majority

mongoose.connect("mongodb+srv://test1:bluesky6048@cluster0.og4ps.mongodb.net/studentdb?retryWrites=true&w=majority", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: true,
});

/* mongoose.connect("mongodb://localhost/studentdb", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: true,
}); */

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


//PASSPORT CONFIG
app.use(require("express-session")({
	secret: "test",
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});


//SCHEMA SETUP
var studentSchema = new mongoose.Schema({
	NUM: String,
	NAME: String,
	DOB: String,
	EMAIL: String,
	PHONE: Number,
	CLASS: String,
	INCHARGE: String,
	ADDRESS: String,
	M1: String,
	M2: String,
	M3: String,
	M4: String,
	M5: String,
	M6: String
});

var student = mongoose.model("student", studentSchema);

app.get('/', function (req, res) {
	res.render('landing');
});


//LOGIN LOGIC
app.post("/", passport.authenticate("local",
	{
		successRedirect: "/allstudents",
		failureRedirect: "/"
	}), function (req, res) {

	});

//LOGOUT ROUTE
app.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});


app.get('/allstudents', isLoggedIn, function (req, res) {

	if (req.query.search) {
		//get info that matches search query
		var regex = new RegExp(escapeRegex(req.query.search), 'gi');
		student.find({ NAME: regex }, function (err, allstudents) {
			if (err) {
				console.log(err);
			} else {
				res.render('allstudents', { allstudents: allstudents });
			}
		});

	} else {
		//get all students from db
		student.find({}, function (err, allstudents) {
			if (err) {
				console.log(err);
			} else {
				res.render('allstudents', { allstudents: allstudents });
			}
		});
	}

});

app.post('/allstudents', function (req, res) {
	//get data from form 
	var NUM = req.body.NUM;
	var NAME = req.body.NAME;
	var DOB = req.body.DOB;
	var EMAIL = req.body.EMAIL;
	var PHONE = req.body.PHONE;
	var CLASS = req.body.CLASS;
	var INCHARGE = req.body.INCHARGE;
	var ADDRESS = req.body.ADDRESS;
	var M1 = req.body.M1;
	var M2 = req.body.M2;
	var M3 = req.body.M3;
	var M4 = req.body.M4;
	var M5 = req.body.M5;
	var M6 = req.body.M6;

	var newStudent = { NUM: NUM, NAME: NAME, DOB: DOB, EMAIL: EMAIL, PHONE: PHONE, CLASS: CLASS, INCHARGE: INCHARGE, ADDRESS: ADDRESS, M1: M1, M2: M2, M3: M3, M4: M4, M5: M5, M6: M6 }
	//create new student and add to db
	student.create(newStudent, function (err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			//redirect to allstudents page
			res.redirect("/allstudents");
		}
	})


});

app.get("/allstudents/new", isLoggedIn, function (req, res) {
	res.render("new");
});


//AUTH ROUTES
app.get("/register", function (req, res) {
	res.render("register");
});

//register logic
app.post("/register", function (req, res) {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function () {
			res.redirect("/");
		});
	});

});


//DELETE ROUTE
app.delete("/allstudents/:id", function (req, res) {
	student.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.redirect("/allstudents");
		} else {
			res.redirect("/allstudents")
		}
	});
});

//EDIT ROUTE

app.get("/allstudents/:id/edit", function (req, res) {
	student.findById(req.params.id, function (err, foundstudent) {
		if (err) {
			res.redirect("/allstudents")
		} else {
			res.render("edit", { student: foundstudent });
		}
	});
});

//student profile
app.get("/allstudents/:id/profile", function (req, res) {
	student.findById(req.params.id, function (err, foundstudent) {
		if (err) {
			res.redirect("/allstudents")
		} else {
			res.render("profile", { student: foundstudent });
		}
	});
});

//UPDATE ROUTE

app.put("/allstudents/:id", function (req, res) {
	student.findByIdAndUpdate(req.params.id, req.body.stuinfo, function (err, updatedstudent) {
		if (err) {
			res.redirect("/allstudents");
		} else {
			res.redirect("/allstudents");
		}
	});
});




//LOGGEDIN CHECKER MIDDLEWARE
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/");
}


//regex for search function
function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


/* app.listen(3001, 'localhost', function () {
	console.log('server started');
});
 */

var port_number = app.listen(process.env.PORT || 3000);
app.listen(port_number, function () {
	console.log('server started');
});