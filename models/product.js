const mongoose=require('mongoose');
  require('mongoose-double')(mongoose);
  const SchemaTypes = mongoose.Schema.Types;
 const product=mongoose.Schema({
    ProductName:{type:String},
    ProductPrice:{ type: String},
    ProductDescription:{type:String},
    ProductRate:{ type: String },
    // ProductName: { type: String },
    // ProductPrice: { type: SchemaTypes.Double },
    // ProductDescription: { type: String },
    // ProductRate: { type: SchemaTypes.Double }

},{timestamps:true});

module.exports=mongoose.model('Product',product);