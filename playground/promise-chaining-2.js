
require('../src/db/mongoose');
const Task = require('../src/models/task');


Task.findByIdAndDelete('60d252ab9e42f3441842dd5d').then((task)=>{
    console.log(task);

    return Task.countDocuments({completed: false})
}).then((res)=>{
    console.log(res);
}).catch((err)=>{console.log(err)})


const deleteTaskAndCount = async(id) =>{
    const deletedTask = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:false});
    return count;
}

deleteTaskAndCount('60cfa103f5fb8b1baca96e44').then((res)=>{
    console.log(res);
}).catch((err)=>{console.log(err)});