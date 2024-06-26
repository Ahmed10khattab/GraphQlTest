

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { graphqlHTTP } = require('express-graphql');
const schema = require('./resolver/resolve');  // Correct import
  //require("./mongo_connection");
  const mongo = require('mongoose');
  const User=require('./models/user');
  const elec=require('./models/product');


//   mongo.connect('mongodb://graph:BjzkIBYPDe9cARVP@ac-pka8jeg-shard-00-00.ytbxqwi.mongodb.net:27017,ac-pka8jeg-shard-00-01.ytbxqwi.mongodb.net:27017,ac-pka8jeg-shard-00-02.ytbxqwi.mongodb.net:27017/?replicaSet=atlas-d5fq1b-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=AtlasCluster')
//   .then(()=>{console.log('connected mongoose successfull')},)
//   .catch((error)=>
//       console.log(error)
  
//   )

mongo.connect('mongodb://graph:BjzkIBYPDe9cARVP@ac-pka8jeg-shard-00-00.ytbxqwi.mongodb.net:27017,ac-pka8jeg-shard-00-01.ytbxqwi.mongodb.net:27017,ac-pka8jeg-shard-00-02.ytbxqwi.mongodb.net:27017/firstProject?replicaSet=atlas-d5fq1b-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=AtlasCluster')
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });
  
  //BjzkIBYPDe9cARVP
// mongo.connect("mongodb://localhost:27017/firstGraphQL",
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }

// ).then(console.log('connected with mongo Success'))




app.use(express.json());





app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.get('/n', (req, res) => {
    res.send('ccccccccccccceee');
});

app.listen(port, () => {
    console.log('Server is running');
});


//"express-graphql": "^0.12.0",
//"graphql": "^14.7.0",

