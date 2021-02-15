const express = require("express");
const route = express.Router();
const University = require("../controllers/admin/academics/universities");
const College = require("../controllers/admin/academics/colleges");
const Years = require("../controllers/admin/academics/years");
const Courses = require("../controllers/admin/academics/courses");
const Streams = require("../controllers/admin/academics/streams");
const Users = require("../controllers/registeration/register");
const Validate = require("../config/validations");
const Users_Login = require("../controllers/registeration/login");
const Categories = require("../controllers/admin/categories/categories");
const Sales = require("../controllers/saleAndBuy/sales");
const Buys = require("../controllers/saleAndBuy/buys");
const Add_Academic = require("../controllers/registeration/add-academic-details");
const Add_Bank = require("../controllers/registeration/add-bank-details");
const Transactions = require("../controllers/transaction/product-purchase");
const Contact = require("../controllers/registeration/contact-us");
const ContactUs = require("../controllers/admin/categories/contact-us");
const Paytm = require("../controllers/transaction/payment");
const Profile = require("../controllers/registeration/update-profile");
const Refer = require('../controllers/registeration/refer-friend')
const upload = require("../config/fileUpload");
const Token = require("../config/verifyToken");
const Videos = require('../controllers/video-courses/upload-video')
const Referrals = require('../controllers/admin/users/referrals')
const Notification = require('../controllers/admin/notifications/notifications')
const Cron = require('../controllers/cron-jobs/notifications')
const UserNotification = require('../controllers/registeration/notifications')
const Categorym = require("../controllers/admin/mcq/category_mcqs");
const Complexitym = require("../controllers/admin/mcq/complexity_mcqs");
const Questionm = require("../controllers/admin/mcq/question_mcqs");
const uploade = require("../controllers/admin/mcq/uploade.js");
const csv= require("../controllers/admin/mcq/csv.js");

route.get('/getNotifications', Token.verifyToken, UserNotification.getAllNotifications)
route.put('/updateNotificationStatus', Token.verifyToken, UserNotification.notificationStatus)

route.post("/getCheckSum", Token.verifyToken, Paytm.initiatePayment);
route.post("/getCheckSumOnWeb", Token.verifyToken, Paytm.initiatePaymentOnWeb);
route.post("/verifyPayment", Token.verifyToken, Paytm.verifyPayment);
route.post("/callback", Paytm.callback);
route.post('/insertNotifications', Token.verifyAdmin, Cron.notifications)
route.post("/addUniversity", Token.verifyAdmin, University.insertUniveristy);
route.get("/findUniversity/:university_id", University.findUniveristy);
route.post("/addCollege", Token.verifyAdmin, College.insertCollege);
route.post("/addCategorym", Token.verifyAdmin, Categorym.insertCategorym);
route.get("/findCollege/:university_id", College.findCollege);
route.get("/findCategorym/:id", Categorym.findCategorym);
route.post("/addYear", Token.verifyAdmin, Years.insertYear);
route.get("/findYear/:year_id", Years.findYear);
route.post("/addCourse", Token.verifyAdmin, Courses.insertCourse);
route.get("/findCourse/:course_id", Courses.findCourse);
route.post("/addStream", Token.verifyAdmin, Streams.insertStream);
route.get("/findStream/:course_id", Streams.findStream);
route.get("/referralStatus", Referrals.referralCount)
route.post("/addNotification", upload.upload.single("image"), Token.verifyAdmin, Notification.addNotification);
route.get("/getAllNotifications", Notification.getAllNotification);
route.post("/addCategory", Categories.insertCategory);
route.get("/findCategory/:id", Categories.findCategory);
route.get("/topCategories", Categories.topSellingCategory);
route.get('/banners', Categories.banner)
route.get("/findQuestionm",Questionm.findQuestionm);
route.post("/addQuestionm", Token.verifyAdmin, Questionm.insertQuestionm);
route.post("/addComplexitym",Token.verifyAdmin, Complexitym.insertComplexitym);
route.get("/findComplexitym/:id", Complexitym.findComplexitym);
route.get("/findbyCategoryAndComplexityOfQuestionm/:category_id/:complexity_id",Questionm.findbyCategoryandComplexityOfQuestionm)
route.post("/questionByCsv", csv.getQuestionsByCsv);
route.get("/questions", csv.getQuestionsByCsv);

route.post("/register", Validate.registerValidations, Users.register);
route.post("/contact", Token.verifyToken, Contact.contact);
route.get("/getQuery", ContactUs.queries);
route.post("/addQuery", ContactUs.insertQuery);

route.post(
  "/forgotPassword",
  Validate.forgotPassValidations,
  Users.forgotPassword
);
route.post("/recoverForgotPassword", Token.verifyForgotToken, Validate.recoverPassValidations, Users.recoverPassword);
route.get("/verify", Users.verifyEmail);
route.post("/referFriend", Token.verifyToken, Refer.referFriend);
route.post("/login", Validate.loginValidations, Users_Login.login);
route.put("/profile", upload.upload.single("profile_image"), Token.verifyToken, Profile.profile);

route.post("/addAcademic", Token.verifyToken, Add_Academic.addAcademicDetails);
route.post("/addBank", Token.verifyToken, Add_Bank.addBankDetails);

route.post("/sale", upload.upload.array("image", 5), Token.verifyToken, Sales.sale);
route.post("/deleteSale", Token.verifyToken, Sales.deleteProduct);
route.get("/myAdds", Token.verifyToken, Sales.myAdds);
route.post("/negotiation", Token.verifyToken, Sales.isNegotiable);

route.put(
  "/updateAdd",
  upload.upload.array("image", 5),
  Token.verifyToken,
  Sales.updateAdds
);
route.post(
  "/otpVerification",
  Token.verifyToken,
  Sales.otpVerify
);

route.get("/buy", Token.verifyToken, Buys.buy);
route.get("/myOrders", Token.verifyToken, Buys.myOrders);
route.put("/productStatus", Token.verifyToken, Buys.approveOrReject);

route.post("/purchase", Token.verifyToken, Transactions.purchase);

route.post("/videoUpload", Videos.videoUpload);


module.exports = route;
