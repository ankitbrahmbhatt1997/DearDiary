const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



var connectPath, options;
//Check if we are on Heroku
if (process.env.PORT) {
    connectPath = "mongodb://Ankit_vidjot@ds127899.mlab.com:27899/vidjot";
    options = {
        auth: {
            user: 'Ankit_vidjot',
            password: 'Vidjotdemo@123'
        }
    }
} else {
    connectPath = "mongodb://localhost:27017/New";
    options = {}
}
mongoose.connect(connectPath, options).then(() => {
    console.log("Database connected");
})
module.exports = {
    mongoose
};