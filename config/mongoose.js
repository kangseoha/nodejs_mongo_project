const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://seoha:1234@selena.z9owk.mongodb.net/selena?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('mongoDB connected..'))
.catch(err=>console.log(err))

module.exports = mongoose;