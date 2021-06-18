//CRUD - create read upadate delete

// const mongodb = require('mongodb')
// // MongoClient is an object which has fun for doing CRUD operations
// const MongoClient = mongodb.MongoClient;
// const OjectID = mongoDB.OjectID;

// using destructuring for object mongodb
const {MongoClient,ObjectID} = require('mongodb');

//connetion Url for mongoDb
const connectionURl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manger'

//setting up a connection with mongoDB servers
MongoClient.connect(connectionURl,{useNewUrlParser:true},(error,clinet)=>{
    if(error){
        return console.log('Unable to connnect to database');
    }
    //creating/getting database of name task manger
      const db = clinet.db(databaseName);
    
    //finding document by id
    // db.collection('users').findOne({_id:new ObjectID("60cd0c41004da013b86bf339")},(error,user)=>{
           
    //        if(error){
    //            return console.log('unable to fetch data');
    //         }
    //        console.log(user);
    // })

    //    db.collection('users').find({age:27}).toArray((error,users)=>{
    //        console.log(users);
    //    })
   
    //    db.collection('users').find({age:27}).count((error,count)=>{
    //        console.log(count);
    //    })

    db.collection('tasks').findOne({_id: new ObjectID("60cd0dc4e29f031828d85524")},(error,task)=>{
        if(error){
            return console.log('unable to fetch task')
        }
        console.log(task);
    })

    db.collection('tasks').find({completed:true}).toArray((error,tasks)=>{
          console.log(tasks);
    })
})
