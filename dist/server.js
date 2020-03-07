/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./APIs/Controllers/ErrorController.js":
/*!*********************************************!*\
  !*** ./APIs/Controllers/ErrorController.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

/***/ }),

/***/ "./APIs/Controllers/authController.js":
/*!********************************************!*\
  !*** ./APIs/Controllers/authController.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Student = __webpack_require__(/*! ../Model/StudentModel */ "./APIs/Model/StudentModel.js");

var jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

var {
  promisify
} = __webpack_require__(/*! util */ "util");

var AppErr = __webpack_require__(/*! ../utils/appError */ "./APIs/utils/appError.js");

var catchAsync = __webpack_require__(/*! ../utils/catchErr */ "./APIs/utils/catchErr.js");

var sendEmail = __webpack_require__(/*! ../utils/email */ "./APIs/utils/email.js");

var crypto = __webpack_require__(/*! crypto */ "crypto");

var singleToken = id => {
  return jwt.sign({
    id
  }, process.env.SEC_STR, {
    expiresIn: process.env.TIME_DUR
  });
};

var createSendToken = (student, statusCode, res, str) => {
  var token = singleToken(student._id);
  var cookieOption = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  if (false) {}
  res.cookie("jwt", token, cookieOption); //remove the password from the output

  student.password = undefined;
  res.status(statusCode).json({
    status: str,
    token,
    data: {
      student
    }
  });
};

exports.signup = catchAsync( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var newStudent = yield Student.create(req.body);
    createSendToken(newStudent, 201, res, "sign up success !!");
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
exports.login = catchAsync( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    var {
      studentId,
      password
    } = req.body; //1) checking the user and pass is provied or not

    if (!studentId || !password) return next(new AppErr("Enter the Email/password", 400)); //2) checking the pass from DB

    var student = yield Student.findOne({
      studentId
    }).select("+password");

    if (!student || !(yield student.checkPassword(password, student.password))) {
      return next(new AppErr("Incorrect the Email/password", 400));
    } //3)Issue the Token


    createSendToken(student, 201, res, "Login success !!");
  });

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
exports.protect = catchAsync( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    var token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      //console.log(req.headers.authorization, "protect");
      token = req.headers.authorization.split(" ")[1];
    } //1) check the token


    if (!token) {
      return next(new AppErr("You must login first ..", 403));
    } //2)verification token


    var decoded = yield promisify(jwt.verify)(token, process.env.SEC_STR); //3)check if the user still exist

    var curStudent = yield Student.findById(decoded.id);

    if (!curStudent) {
      return next(new AppErr("Student have been deleted", 404));
    } //4)Check if the user change password after the token was issused


    if (curStudent.changePasswordAfter(decoded.iat)) {
      return next(new AppErr("Student recently changed  the password ", 400));
    } //grant access


    req.student = curStudent;
    console.log(req.student);
    next();
  });

  return function (_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}());
exports.passwordForget = catchAsync( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    //1)Get student based on student ID
    var student = yield Student.findOne({
      studentId: req.body.studentId
    });
    if (!student) return next(new AppErr("No such student found by this ID", 404));
    var resetToken = student.generateResetToken();
    console.log(resetToken); //Logs the restToken
    //2) saveing the reset Token to DB

    yield student.save({
      validateBeforeSave: false
    });
    var reset = "".concat(req.protocol, "://").concat(req.get("host"), "/api/v1/student/resetPassword/").concat(resetToken);
    var message = "Forget Your password ? just click the following link  to  change it ".concat(reset, ".\nif you remember ignore it"); //3)Mail Sending function

    try {
      yield sendEmail({
        studentId: student.studentId,
        subject: "your password reset link vaild for 10 min",
        message
      });
      res.status(200).json({
        status: "success",
        message: "token sent to email"
      });
    } catch (err) {
      student.passwordResetToken = undefined;
      student.passwordResetExpires = undefined;
      yield student.save({
        validateBeforeSave: false
      });
      return next(new AppErr("there was a error in mail", 500));
    }
  });

  return function (_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}());
exports.resetPassword = catchAsync( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    //1) encrypting the token
    var hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex"); //2)finding the user relavent to the token

    var student = yield Student.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: {
        $gt: Date.now()
      }
    }); //3) if token expired or user not found.

    if (!student) {
      return next(new AppErr("Token is invalid or expired", 400));
    } //4)update change at property for the user


    console.log(req.body.password, req.body.passwordConfirm);
    student.password = req.body.password;
    student.passwordConfirm = req.body.passwordConfirm;
    student.passwordResetExpires = undefined;
    student.passwordResetToken = undefined;
    student.passwordChangeAt = Date.now() - 1000;
    yield student.save(); //5) log the student in ..

    createSendToken(student, 200, res, "Login success !!");
  });

  return function (_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}());
exports.updatePassword = catchAsync( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res, next) {
    //1) Get the user from the collection
    var student = yield Student.findById(req.student._id).select("+password");
    console.log(req.body.password, student.password); //2)Check if posted current password is correct

    if (!(yield student.checkPassword(req.body.passwordCurrent, student.password))) {
      return next(new AppErr("Your Current password is wrong", 401));
    } //3)if so, update password


    student.password = req.body.password;
    student.passwordConfrim = req.body.passwordConfrim;
    console.log("sas");
    yield student.save();
    createSendToken(student, 200, res, "Password updated !!");
  });

  return function (_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}());

/***/ }),

/***/ "./APIs/Controllers/studentController.js":
/*!***********************************************!*\
  !*** ./APIs/Controllers/studentController.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Student = __webpack_require__(/*! ../Model/StudentModel */ "./APIs/Model/StudentModel.js");

exports.getAll = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var allStudents = yield Student.find();
    res.status(200).json({
      message: "Success!",
      data: {
        allStudents
      }
    });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./APIs/Model/StudentModel.js":
/*!************************************!*\
  !*** ./APIs/Model/StudentModel.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var validator = __webpack_require__(/*! validator */ "validator");

var bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");

var crypto = __webpack_require__(/*! crypto */ "crypto");

var studentSchema = mongoose.Schema({
  name: {
    type: String
  },
  class: {
    type: Number,
    min: 5,
    max: 9
  },
  studentId: {
    type: String,
    validate: [validator.isEmail, "Enter valid ID"],
    lowercase: true,
    unique: true,
    required: [true, "say your student ID"]
  },
  photo: String,
  password: {
    type: String,
    minlength: 6,
    required: [true, "password"],
    select: false
  },
  passwordConfrim: {
    type: String,
    required: [true, "Enter Confrim Password "],
    validate: {
      validator: function validator(el) {
        return el === this.password;
      },
      message: "password not match !"
    }
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});
studentSchema.pre("save", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (next) {
    if (!this.isModified("password")) return next();
    this.password = yield bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()); //method to check the password from the datebase

studentSchema.methods.checkPassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (Enteredpassword, DBpassword) {
    return yield bcrypt.compare(Enteredpassword, DBpassword);
  });

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}(); //method for protect middleware


studentSchema.methods.changePasswordAfter = function (JWTtimestamp) {
  if (this.passwordChangeAt) {
    var changedTimeStamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
    return changedTimeStamp > JWTtimestamp;
  }
};

studentSchema.methods.generateResetToken = function () {
  //1)generate Random String
  var resetToken = crypto.randomBytes(32).toString("hex"); //2)Encrypting the random String and saveing to DB

  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex"); //3)Setting password resetToken expire time

  this.passwordResetExpires = Date.now() + 600000; // 10 Mins
  //4)Sending non encrpted token  to user

  return resetToken;
};

var Student = mongoose.model("Student", studentSchema);
module.exports = Student;

/***/ }),

/***/ "./APIs/Routers/studentRouter.js":
/*!***************************************!*\
  !*** ./APIs/Routers/studentRouter.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var express = __webpack_require__(/*! express */ "express");

var router = express.Router();

var authController = __webpack_require__(/*! ../Controllers/authController */ "./APIs/Controllers/authController.js");

var studentController = __webpack_require__(/*! ../Controllers/studentController */ "./APIs/Controllers/studentController.js");

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/forgetPassword").post(authController.passwordForget);
router.route("/resetPassword/:token").post(authController.resetPassword);
router.route("/updatePassword").post(authController.protect, authController.updatePassword);
router.route("/getAll").get(authController.protect, studentController.getAll);
module.exports = router;

/***/ }),

/***/ "./APIs/utils/appError.js":
/*!********************************!*\
  !*** ./APIs/utils/appError.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = "".concat(statusCode).startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

}

module.exports = AppError;

/***/ }),

/***/ "./APIs/utils/catchErr.js":
/*!********************************!*\
  !*** ./APIs/utils/catchErr.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/***/ }),

/***/ "./APIs/utils/email.js":
/*!*****************************!*\
  !*** ./APIs/utils/email.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");

var sendEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (option) {
    console.log(option); //1) create a transfer

    var transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      } //Active in gmail

    }); //2) Define the email option

    var mailOption = {
      from: "Siva prakash  <admin@chillstudies.com>",
      to: option.studentId,
      subject: option.subject,
      text: option.message
    }; //3)Actually send the email

    yield transporter.sendMail(mailOption);
  });

  return function sendEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = sendEmail;

/***/ }),

/***/ "./React/Server/index.js":
/*!*******************************!*\
  !*** ./React/Server/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Shared_App__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Shared/App */ "./React/Shared/App.js");
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CssBaseline */ "@material-ui/core/CssBaseline");
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Shared_theme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Shared/theme */ "./React/Shared/theme.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! serialize-javascript */ "serialize-javascript");
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Shared_routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Shared/routes */ "./React/Shared/routes.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.static('dist'));
router.route('*').get((req, res, next) => {
  var sheets = new _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["ServerStyleSheets"]();
  var activeRoute = _Shared_routes__WEBPACK_IMPORTED_MODULE_9__["default"].find(route => Object(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["matchPath"])(req.url, route));

  var context = _objectSpread({}, activeRoute);

  var markup = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_3__["renderToString"])(sheets.collect(react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["StaticRouter"], {
    context: context,
    location: req.url
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["ThemeProvider"], {
    theme: _Shared_theme__WEBPACK_IMPORTED_MODULE_6__["default"]
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_5___default.a, null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Shared_App__WEBPACK_IMPORTED_MODULE_4__["default"], null)))));
  var css = sheets.toString();
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end("<!DOCTYPE html>\n      <html lang='en'>\n        <head>\n          <title>ChillStudies</title>\n          <style id='jss-server-side'>".concat(css, "</style>\n          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />\n          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />\n          <script>window.__initialData__ = ").concat(serialize_javascript__WEBPACK_IMPORTED_MODULE_8___default()(JSON.stringify(activeRoute)), "</script>\n        </head>\n        <body>\n          <div id='root'>").concat(markup, "</div>\n          <script src=\"/client.js\" async></script>\n        </body>\n      </html>\n    ")).catch(next);
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./React/Shared/App.js":
/*!*****************************!*\
  !*** ./React/Shared/App.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes */ "./React/Shared/routes.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





class App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, _routes__WEBPACK_IMPORTED_MODULE_2__["default"].map((route, i) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], _extends({
      key: i + 1
    }, route)))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./React/Shared/Course.js":
/*!********************************!*\
  !*** ./React/Shared/Course.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return JavaClass1; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _courses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./courses */ "./React/Shared/courses.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__);



var useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["makeStyles"])(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  link: {
    textDecoration: 'none'
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9

  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));
function JavaClass1(props) {
  var classes = useStyles();
  var course = _courses__WEBPACK_IMPORTED_MODULE_1__["default"].find(course => props.match.params.course === course.name),
      course_no = props.match.params.course_no;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["AppBar"], {
    position: "relative"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Toolbar"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
    variant: "h6",
    color: "inherit",
    noWrap: true
  }, course.name + ' ' + course_no))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Card"], {
    className: classes.card
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CardContent"], {
    className: classes.cardContent
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", {
    width: "1280",
    height: "720",
    src: "https://www.youtube.com/embed/I2wvhRUVNTM",
    frameborder: "0",
    allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen: true
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
    gutterBottom: true,
    variant: "h5",
    component: "h2"
  }, "Hello World"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], null, "Not as a tredition, but as a newbie lets learn whats the so called hello world is."))));
}

/***/ }),

/***/ "./React/Shared/CourseHome.js":
/*!************************************!*\
  !*** ./React/Shared/CourseHome.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClassHome; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/AppBar */ "@material-ui/core/AppBar");
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CssBaseline */ "@material-ui/core/CssBaseline");
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "@material-ui/core/Toolbar");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Container */ "@material-ui/core/Container");
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _courses__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./courses */ "./React/Shared/courses.js");














function Copyright() {
  var classes = useStyles();
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    variant: "body2",
    color: "textSecondary",
    align: "center"
  }, 'Copyright © ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Link"], {
    to: "/",
    className: classes.link
  }, "Chill Studies"), ' ', new Date().getFullYear(), '.');
}

var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__["makeStyles"])(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  link: {
    textDecoration: 'none'
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9

  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));
var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function ClassHome(props) {
  var classes = useStyles();
  var course = _courses__WEBPACK_IMPORTED_MODULE_12__["default"].find(course => props.match.params.course === course.name);
  return course ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_5___default.a, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_1___default.a, {
    position: "relative"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_7___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    variant: "h6",
    color: "inherit",
    noWrap: true
  }, course.name))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.heroContent
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_10___default.a, {
    maxWidth: "sm"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    component: "h1",
    variant: "h2",
    align: "center",
    color: "textPrimary",
    gutterBottom: true
  }, "Welcome to ", course.name, "!"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    variant: "h5",
    align: "center",
    color: "textSecondary",
    paragraph: true
  }, "Happy Learning"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_10___default.a, {
    className: classes.cardGrid,
    maxWidth: "md"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6___default.a, {
    container: true,
    spacing: 4
  }, cards.map((card, i) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6___default.a, {
    item: true,
    key: card,
    xs: 12,
    sm: 6,
    md: 4
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Link"], {
    className: classes.link,
    to: "".concat(course.name, "/").concat(i + 1)
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: classes.card
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_4___default.a, {
    className: classes.cardMedia,
    image: course.image,
    title: "".concat(course.name).concat(i + 1)
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_3___default.a, {
    className: classes.cardContent
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    gutterBottom: true,
    variant: "h5",
    component: "h2"
  }, "".concat(course.name).concat(i + 1)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, null, "This is a begginer level ", course.name, " course you can start with ease."))))))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
    className: classes.footer
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    variant: "h6",
    align: "center",
    gutterBottom: true
  }, "\u201CStudy hard what interests you the most in the most undisciplined, irreverent and original manner possible.\u201D"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    variant: "subtitle1",
    align: "center",
    color: "textSecondary",
    component: "p"
  }, "Richard P. Feynman"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Copyright, null))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "404 ERROR"));
}

/***/ }),

/***/ "./React/Shared/Dashboard.js":
/*!***********************************!*\
  !*** ./React/Shared/Dashboard.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Album; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/AppBar */ "@material-ui/core/AppBar");
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CssBaseline */ "@material-ui/core/CssBaseline");
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "@material-ui/core/Toolbar");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Container */ "@material-ui/core/Container");
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _courses__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./courses */ "./React/Shared/courses.js");














function Copyright() {
  var classes = useStyles();
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    variant: "body2",
    color: "textSecondary",
    align: "center"
  }, 'Copyright © ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Link"], {
    to: "/",
    className: classes.link
  }, "Chill Studies"), ' ', new Date().getFullYear(), '.');
}

var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__["makeStyles"])(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  link: {
    textDecoration: 'none'
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9

  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));
function Album() {
  var classes = useStyles();
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_5___default.a, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_1___default.a, {
    position: "relative"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_7___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    variant: "h6",
    color: "inherit",
    noWrap: true
  }, "Dashboard"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.heroContent
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_10___default.a, {
    maxWidth: "sm"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    component: "h1",
    variant: "h2",
    align: "center",
    color: "textPrimary",
    gutterBottom: true
  }, "Welcome to your Dashboard !"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    variant: "h5",
    align: "center",
    color: "textSecondary",
    paragraph: true
  }, "You can find your subscribed courses below. Happy Learning !."))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_10___default.a, {
    className: classes.cardGrid,
    maxWidth: "md"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6___default.a, {
    container: true,
    spacing: 4
  }, _courses__WEBPACK_IMPORTED_MODULE_12__["default"].map(course => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6___default.a, {
    item: true,
    key: course,
    xs: 12,
    sm: 6,
    md: 4
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Link"], {
    className: classes.link,
    to: "/".concat(course.name)
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: classes.card
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_4___default.a, {
    className: classes.cardMedia,
    image: course.image,
    title: course.name
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_3___default.a, {
    className: classes.cardContent
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    gutterBottom: true,
    variant: "h5",
    component: "h2"
  }, course.desc))))))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
    className: classes.footer
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    variant: "h6",
    align: "center",
    gutterBottom: true
  }, "\u201CStudy hard what interests you the most in the most undisciplined, irreverent and original manner possible.\u201D"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
    variant: "subtitle1",
    align: "center",
    color: "textSecondary",
    component: "p"
  }, "Richard P. Feynman"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Copyright, null)));
}

/***/ }),

/***/ "./React/Shared/Login.js":
/*!*******************************!*\
  !*** ./React/Shared/Login.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Login; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CssBaseline */ "@material-ui/core/CssBaseline");
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "@material-ui/core/FormControlLabel");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "@material-ui/core/Checkbox");
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Link */ "@material-ui/core/Link");
/* harmony import */ var _material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Paper */ "@material-ui/core/Paper");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Box */ "@material-ui/core/Box");
/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/LockOutlined */ "@material-ui/icons/LockOutlined");
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_15__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


















function Copyright() {
  var classes = useStyles();
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_12___default.a, {
    variant: "body2",
    color: "textSecondary",
    align: "center"
  }, 'Copyright © ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_15__["Link"], {
    to: "/",
    className: classes.link
  }, "Chill Studies"), ' ', new Date().getFullYear(), '.');
}

var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__["makeStyles"])(theme => ({
  root: {
    height: '100vh'
  },
  link: {
    textDecoration: 'none',
    marginTop: '5px%'
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function handleClick(_x, _x2) {
  return _handleClick.apply(this, arguments);
}

function _handleClick() {
  _handleClick = _asyncToGenerator(function* (e, props) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    try {
      var res = yield axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('http://127.0.0.1:8000/api/v1/student/login', {
        "studentId": email,
        "password": password
      });

      if (res.data.status === 'Login success !!') {
        props.history.push('/dashboard');
      } else {
        alert("Pls Enter Valid Details");
      }
    } catch (err) {
      alert(err);
    }
  });
  return _handleClick.apply(this, arguments);
}

function Login(props) {
  var classes = useStyles();
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10___default.a, {
    container: true,
    component: "main",
    className: classes.root
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_3___default.a, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10___default.a, {
    item: true,
    xs: false,
    sm: 4,
    md: 7,
    className: classes.image
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10___default.a, {
    item: true,
    xs: 12,
    sm: 8,
    md: 5,
    component: _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_8___default.a,
    elevation: 6,
    square: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.paper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {
    className: classes.avatar
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_11___default.a, null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_12___default.a, {
    component: "h1",
    variant: "h5"
  }, "Sign in"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    className: classes.form,
    noValidate: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default.a, {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    id: "email",
    label: "Email Address",
    name: "email",
    autoComplete: "email",
    autoFocus: true
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default.a, {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    name: "password",
    label: "Password",
    type: "password",
    id: "password",
    autoComplete: "current-password"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_5___default.a, {
    control: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_6___default.a, {
      value: "remember",
      color: "primary"
    }),
    label: "Remember me"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
    type: "submit",
    fullWidth: true,
    variant: "contained",
    color: "primary",
    className: classes.submit,
    onClick: e => {
      handleClick(e, props);
    }
  }, "Sign In"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_15__["Link"], {
    className: classes.link,
    to: "/signup"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    className: classes.submit
  }, "Sign Up")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10___default.a, {
    container: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10___default.a, {
    item: true,
    xs: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7___default.a, {
    href: "#",
    variant: "body2"
  }, "Forgot password?")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10___default.a, {
    item: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7___default.a, {
    href: "#",
    variant: "body2"
  }, "Don't have an account? Sign Up"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9___default.a, {
    mt: 5
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Copyright, null))))));
}

/***/ }),

/***/ "./React/Shared/Signup.js":
/*!********************************!*\
  !*** ./React/Shared/Signup.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SignUp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CssBaseline */ "@material-ui/core/CssBaseline");
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "@material-ui/core/FormControlLabel");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "@material-ui/core/Checkbox");
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Link */ "@material-ui/core/Link");
/* harmony import */ var _material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Box */ "@material-ui/core/Box");
/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/LockOutlined */ "@material-ui/icons/LockOutlined");
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/Container */ "@material-ui/core/Container");
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_15__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


















function Copyright() {
  var classes = useStyles();
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11___default.a, {
    variant: "body2",
    color: "textSecondary",
    align: "center"
  }, 'Copyright © ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7___default.a, {
    color: "inherit"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_15__["Link"], {
    to: "/",
    className: classes.link
  }, "Chill Studies")), ' ', new Date().getFullYear(), '.');
}

var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_12__["makeStyles"])(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function handleClick(_x, _x2) {
  return _handleClick.apply(this, arguments);
}

function _handleClick() {
  _handleClick = _asyncToGenerator(function* (e, props) {
    e.preventDefault();
    var name = document.getElementById('name').value,
        email = document.getElementById('email').value,
        password = document.getElementById('password').value,
        confirmPassword = document.getElementById('confirmPassword').value;

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      alert("Provide Valid Informations");
    } else {
      var data = {
        "name": name,
        "studentId": email,
        "password": password,
        "passwordConfrim": confirmPassword
      };

      try {
        var res = yield axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('http://127.0.0.1:8000/api/v1/student/signup', data);

        if (res.data.status === 'sign up success !!') {
          alert('You Successfully Signed Up !!! \n Now Sign In To Continue');
          props.history.push('/');
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
  return _handleClick.apply(this, arguments);
}

function SignUp(props) {
  var classes = useStyles();
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_13___default.a, {
    component: "main",
    maxWidth: "xs"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_3___default.a, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.paper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {
    className: classes.avatar
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_10___default.a, null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11___default.a, {
    component: "h1",
    variant: "h5"
  }, "Sign Up"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    className: classes.form,
    noValidate: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default.a, {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    id: "name",
    label: "Name",
    name: "name",
    autoComplete: "name",
    autoFocus: true,
    required: true
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default.a, {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    id: "email",
    label: "Email Address",
    name: "email",
    autoComplete: "email"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default.a, {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    name: "password",
    label: "Password",
    type: "password",
    id: "password",
    autoComplete: "current-password"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default.a, {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    id: "confirmPassword",
    autoComplete: "current-password"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_5___default.a, {
    control: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_6___default.a, {
      value: "remember",
      color: "primary"
    }),
    label: "Remember me"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    className: classes.submit,
    onClick: e => handleClick(e, props)
  }, "Sign Up"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
    container: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
    item: true,
    xs: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7___default.a, {
    href: "#",
    variant: "body2"
  }, "Forgot password?")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
    item: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7___default.a, {
    href: "#",
    variant: "body2"
  }, "Don't have an account? Sign Up"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9___default.a, {
    mt: 8
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Copyright, null)));
}

/***/ }),

/***/ "./React/Shared/courses.js":
/*!*********************************!*\
  !*** ./React/Shared/courses.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var courses = [{
  name: 'Java',
  image: 'https://c4.wallpaperflare.com/wallpaper/510/989/208/web-development-development-java-wallpaper-preview.jpg',
  desc: 'Java Beginner Pack'
}, {
  name: 'Python',
  image: 'https://www.nicepng.com/png/detail/148-1484226_image-python-circle-logo.png',
  desc: 'Python Beginner Pack'
}, {
  name: 'C',
  image: 'https://tricksinfo.net/wp-content/uploads/2019/09/C-Programming-Language0A-750x405.jpg',
  desc: 'C Beginner Pack'
}, {
  name: 'C++',
  image: 'https://cdn.dribbble.com/users/46200/screenshots/4107676/cpp_dribble_1.png',
  desc: 'C++ Beginner Pack'
}, {
  name: 'JavaScript',
  image: 'https://i1.wp.com/www.nishantvaity.com/wp-content/uploads/2019/05/javascript.jpg?fit=650%2C400&ssl=1',
  desc: 'JavaScript Beginner Pack'
}, {
  name: 'HTML',
  image: 'https://dinesh-ghimire.com.np/wp-content/uploads/2019/02/html5.png',
  desc: 'HTML Beginner Pack'
}, {
  name: 'CSS',
  image: 'https://colorlib.com/wp/wp-content/uploads/sites/2/creative-css3-tutorials.jpg',
  desc: 'CSS Beginner Pack'
}, {
  name: 'ReactJs',
  image: 'https://embedwistia-a.akamaihd.net/deliveries/bdfbccc31132d5f0a48bbf0caacced1e.webp?image_crop_resized=1280x800',
  desc: 'ReactJs Beginner Pack'
}, {
  name: 'NodeJs',
  image: 'https://cdnblog.natrocdn.com/wp-content/uploads/2019/10/node-js-nedir-768x427.jpg',
  desc: 'NodeJs Beginner Pack'
}];
/* harmony default export */ __webpack_exports__["default"] = (courses);

/***/ }),

/***/ "./React/Shared/routes.js":
/*!********************************!*\
  !*** ./React/Shared/routes.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login */ "./React/Shared/Login.js");
/* harmony import */ var _Signup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Signup */ "./React/Shared/Signup.js");
/* harmony import */ var _Dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dashboard */ "./React/Shared/Dashboard.js");
/* harmony import */ var _Course__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Course */ "./React/Shared/Course.js");
/* harmony import */ var _CourseHome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CourseHome */ "./React/Shared/CourseHome.js");





var routes = [{
  path: "/",
  component: _Login__WEBPACK_IMPORTED_MODULE_0__["default"],
  exact: true
}, {
  path: "/signup",
  component: _Signup__WEBPACK_IMPORTED_MODULE_1__["default"],
  exact: true
}, {
  path: "/dashboard",
  component: _Dashboard__WEBPACK_IMPORTED_MODULE_2__["default"],
  exact: true
}, {
  path: "/:course",
  component: _CourseHome__WEBPACK_IMPORTED_MODULE_4__["default"],
  exact: true
}, {
  path: "/:course/:course_no",
  component: _Course__WEBPACK_IMPORTED_MODULE_3__["default"],
  exact: true
}];
/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ }),

/***/ "./React/Shared/theme.js":
/*!*******************************!*\
  !*** ./React/Shared/theme.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/colors */ "@material-ui/core/colors");
/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors__WEBPACK_IMPORTED_MODULE_1__);

 // Create a theme instance.

var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createMuiTheme"])({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_1__["red"].A400
    },
    background: {
      default: '#fff'
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (theme);

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _React_Server_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./React/Server/index */ "./React/Server/index.js");


var cors = __webpack_require__(/*! cors */ "cors");

var morgan = __webpack_require__(/*! morgan */ "morgan");

var globalErrorHandler = __webpack_require__(/*! ./APIs/Controllers/ErrorController */ "./APIs/Controllers/ErrorController.js");

var AppErr = __webpack_require__(/*! ./APIs/utils/appError */ "./APIs/utils/appError.js");

var studentRouter = __webpack_require__(/*! ./APIs/Routers/studentRouter */ "./APIs/Routers/studentRouter.js");


var app = express__WEBPACK_IMPORTED_MODULE_0___default()();
app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.json());
app.use(morgan("dev"));
app.use(cors()); //===============Routers=====================

app.use("/api/v1/student", studentRouter);
app.use("/", _React_Server_index__WEBPACK_IMPORTED_MODULE_1__["default"]);
app.all("*", (req, res, next) => {
  next(new AppErr("Can't find a route - BAD URL", 404));
});
app.use(globalErrorHandler);
/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./app.js");


var dotenv = __webpack_require__(/*! dotenv */ "dotenv");

var mongoose = __webpack_require__(/*! mongoose */ "mongoose");

dotenv.config({
  path: "./config.env"
});
var DB = process.env.DB_CON.replace("<password>", process.env.DB_PASS);
console.log(DB);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database connection Done !");
}).catch(err => {
  console.log(err);
});
var port = process.env.CON_PORT;
_app__WEBPACK_IMPORTED_MODULE_0__["default"].listen(port, () => {
  console.log("Server Started at http://localhost:8000");
});

/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/core/AppBar":
/*!*******************************************!*\
  !*** external "@material-ui/core/AppBar" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/AppBar");

/***/ }),

/***/ "@material-ui/core/Avatar":
/*!*******************************************!*\
  !*** external "@material-ui/core/Avatar" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Avatar");

/***/ }),

/***/ "@material-ui/core/Box":
/*!****************************************!*\
  !*** external "@material-ui/core/Box" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Box");

/***/ }),

/***/ "@material-ui/core/Button":
/*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),

/***/ "@material-ui/core/Card":
/*!*****************************************!*\
  !*** external "@material-ui/core/Card" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Card");

/***/ }),

/***/ "@material-ui/core/CardContent":
/*!************************************************!*\
  !*** external "@material-ui/core/CardContent" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardContent");

/***/ }),

/***/ "@material-ui/core/CardMedia":
/*!**********************************************!*\
  !*** external "@material-ui/core/CardMedia" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardMedia");

/***/ }),

/***/ "@material-ui/core/Checkbox":
/*!*********************************************!*\
  !*** external "@material-ui/core/Checkbox" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Checkbox");

/***/ }),

/***/ "@material-ui/core/Container":
/*!**********************************************!*\
  !*** external "@material-ui/core/Container" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Container");

/***/ }),

/***/ "@material-ui/core/CssBaseline":
/*!************************************************!*\
  !*** external "@material-ui/core/CssBaseline" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CssBaseline");

/***/ }),

/***/ "@material-ui/core/FormControlLabel":
/*!*****************************************************!*\
  !*** external "@material-ui/core/FormControlLabel" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/FormControlLabel");

/***/ }),

/***/ "@material-ui/core/Grid":
/*!*****************************************!*\
  !*** external "@material-ui/core/Grid" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Grid");

/***/ }),

/***/ "@material-ui/core/Link":
/*!*****************************************!*\
  !*** external "@material-ui/core/Link" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Link");

/***/ }),

/***/ "@material-ui/core/Paper":
/*!******************************************!*\
  !*** external "@material-ui/core/Paper" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Paper");

/***/ }),

/***/ "@material-ui/core/TextField":
/*!**********************************************!*\
  !*** external "@material-ui/core/TextField" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/TextField");

/***/ }),

/***/ "@material-ui/core/Toolbar":
/*!********************************************!*\
  !*** external "@material-ui/core/Toolbar" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Toolbar");

/***/ }),

/***/ "@material-ui/core/Typography":
/*!***********************************************!*\
  !*** external "@material-ui/core/Typography" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),

/***/ "@material-ui/core/colors":
/*!*******************************************!*\
  !*** external "@material-ui/core/colors" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/colors");

/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "@material-ui/icons/LockOutlined":
/*!**************************************************!*\
  !*** external "@material-ui/icons/LockOutlined" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/LockOutlined");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map