const mongoose = require('mongoose');
const dbString = `mongodb+srv://shiva:satyamholidays@cluster0-nkzvt.gcp.mongodb.net/SatyamModule?retryWrites=true&w=majority`;
mongoose.connect(dbString,(err)=>{
    if(!err){
        console.log('Database Connected Successfully');
    }else{
        console.log('Database Failed to connect');
    }
});

module.exports = mongoose;