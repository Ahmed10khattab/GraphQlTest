
// const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');

// const wordType = new GraphQLObjectType({
//     name: 'word',
//     description: 'this is a single word',
//     fields: {
//         word: { type: GraphQLString, description: '' },
//         type: { type: GraphQLString, description: '' },
//         example: { type: GraphQLString, description: '' },
//         soundUrl: { type: GraphQLString, description: '' }
//     }
// });

// const queryType = new GraphQLObjectType({
//     name: 'query',
//     description: 'this is query type',
//     fields: {
//         Product: {
//             type: new GraphQLList(wordType),
//             description: 'this is the list of Product return',
//             resolve: () => {
//                 return [{ word: 'Hello', type: 'greeting', example: 'Hello, world!', soundUrl: '' }];
//             }
//         },
//         word:{
//             type:wordType,
//             description: "this is one word return",
//             resolve:()=>{
//                 return {word:"hi"}
//             }


//         }
//     }
// });

// const schema = new GraphQLSchema({
//     query: queryType,
//   //  mutation:mutation
// });

// module.exports = schema;



const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLSchema, GraphQLList, GraphQLFloat, GraphQLID } = require('graphql');
const auth = require('../controllers/auth');
const ProductCnt = require('../controllers/product');


const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: { type: GraphQLString },
        ProductName: { type: GraphQLString },
        ProductPrice: { type: GraphQLFloat },
        ProductDescription: { type: GraphQLString },
        ProductRate: { type: GraphQLFloat }
    }
});




const SignupResponseType = new GraphQLObjectType({
    name: 'SignupResponse',
    fields: {
        message: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        isAdmin: { type: GraphQLBoolean }
    }
});

const LoginResponseType = new GraphQLObjectType({
    name: 'LoginResponse',
    fields: {
        message: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        isAdmin: { type: GraphQLBoolean },
        token: { type: GraphQLString }
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'This is the root mutation type',
    fields: {


        signup: {
            type: SignupResponseType,
            description: 'Signup a new user',
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                isAdmin: { type: GraphQLBoolean }
            },
            resolve: auth.signup
        },
        login: {
            type: LoginResponseType,
            description: 'Login a user',
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: auth.login
        },
        addProduct: {
            type: ProductType,
            description: 'Add a new Product',
            args: {


                ProductName: { type: new GraphQLNonNull(GraphQLString) },
                ProductPrice: { type: new GraphQLNonNull(GraphQLFloat) },
                ProductDescription: { type: new GraphQLNonNull(GraphQLString) },
                ProductRate: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve: (_, { ProductName, ProductPrice, ProductDescription, ProductRate }) => {
                const newProduct = {
                    id: new Date().toISOString(),
                    ProductName,
                    ProductPrice,
                    ProductDescription,
                    ProductRate
                };
                return ProductCnt.createItem2(newProduct);
            }
        },

        deleteAllProduct: {
            type: GraphQLString,
            description: 'Delete all Products',
            resolve: async () => {
                await ProductCnt.deleteAll();
                return 'All Products deleted successfully';
            }
        },


        deleteProductById: {
            type: GraphQLString,
            description: 'delete one Product',
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async (_, args) => {
                await ProductCnt.deleteItem2(args.id);
                return "Product deleted successfully";

            }

        },

        updateProduct: {
            type: ProductType,
            description: 'Update a product',
            args: {
             id: { type: new GraphQLNonNull(GraphQLID) },
                ProductName: { type: GraphQLString },
                ProductPrice: { type: GraphQLFloat },
                ProductDescription: { type: GraphQLString },
                ProductRate: { type: GraphQLFloat }
            },
            resolve: (_, { id, ProductRate, ProductDescription,ProductName,ProductPrice }) => {
                const updatedWord = {};
                if (ProductName !== undefined) updatedWord.ProductName = ProductName;
                if (ProductPrice !== undefined) updatedWord.ProductPrice = ProductPrice;
                if (ProductDescription !== undefined) updatedWord.ProductDescription = ProductDescription;
                if (ProductRate !== undefined) updatedWord.ProductRate = ProductRate;
                return ProductCnt.UpdateItem2(id, ProductName, ProductPrice,ProductDescription,ProductRate);
            }
        }
    }
});

const wordType = new GraphQLObjectType({
    name: 'word',
    description: 'this is a single word  Ya nasser',
    fields: {
        word: { type: GraphQLString, description: '' },
        type: { type: GraphQLString, description: '' },
        example: { type: GraphQLString, description: '' },
        soundUrl: { type: GraphQLString, description: '' }
    }
});
const queryType = new GraphQLObjectType({
    name: 'query',
    description: 'this is query type Ya nasser',
    fields: {
        getAllProduct: {
            type: new GraphQLList(ProductType),
            description: 'this is the list of Product return Ya nasser',
            resolve: () => {
                return  ProductCnt.getAllData1();
            }
        },
               GetOneProductById: {
            type: ProductType,
            description: "this is one Product return  Ya nasser",
            args: {
                id: { type: GraphQLID, description: "this id For your Product Ya nasser" }
            },
            resolve: (_, args) => {
                return ProductCnt.OneItem2(args.id);
            }


        }
    }
});


const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
    
    // Add your query type here if you have one
});

module.exports = schema;


// module.exports = mutationType;
