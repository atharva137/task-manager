require('../src/db/mongoose');
const User = require('../src/models/users');

User.findByIdAndUpdate('60cf9fef9331d5256c906c51',{age:1}).then((user) => {
    console.log(user);
    return User.countDocuments({age:1})
}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
})

const updateAgeCount=async(id,age) =>{
 const user = await User.findByIdAndUpdate(id,{age:age});
 const count = await User.countDocuments({age:age});
 return count;
}

updateAgeCount('60cf9fef9331d5256c906c51',10).then((result) => {
    console.log(result);
}).catch((err) => {console.log(err);})