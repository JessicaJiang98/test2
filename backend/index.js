const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var { graphql, buildSchema, GraphQLSchema, GraphQLList } = require('graphql');
const {GraphQLObjectType,GraphQLString}  = require('graphql')
var StatesData=require('./statesData.json')
const {graphqlHTTP} = require('express-graphql');


const app=express();



app.use(bodyParser.json());
app.use(cors());


//SCHEMA
const StatesType = new GraphQLObjectType({
    name: "States",
    fields:() => ({
        name:{type:GraphQLString},
        abbreviation:{type:GraphQLString}
    })

})



const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        filterStates:{
            type: new GraphQLList(StatesType),
            args: { name: { type: GraphQLString}},
            resolve(parent,args){
                var input=args.name

                return StatesData.filter(states => states.name.toLowerCase().includes(input.toLowerCase()))
            }
        }
    }

})






const schema = new GraphQLSchema({
    query: RootQuery
})



app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true

}))



// fields:{
//     name:{
//         type: GraphQLString
//     },
//     abbreviation:{
//         type: GraphQLString
//     }
// }



app.get('/',(req,res)=>{
    res.send('hello')
})

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`server started on port ${port}`))
