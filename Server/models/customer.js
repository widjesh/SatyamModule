const mongoose = require("mongoose");
var customer = mongoose.model("customer", {
  title: { type:String },
  firstname : {type : String},
  lastname : {type : String},
  dob : {type : Date},
  nationality : {type : String},
  contact:{
      mobilenumber : {type:String},
      sms_sr:{type:String},
      sms_nl:{type : String},
      email : {type: String}
  },
  address : {
      zip : {type: Number},
      city : {type : String},
      street : {type : String},
      country : {type : String}
  },
  passport:{
      passportno:{type: String},
      expirationdate : {type: Date}
  },
  modifiedby:{
      username : {type : String},
      date:{type : Date}
  }
});

module.exports = customer;
