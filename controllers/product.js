const ProductModel = require('../models/product');


const getAllData1 = () => {
    return ProductModel.find({});
}

const OneItem2 = (id) => {
    return ProductModel.findById(id);

};

const createItem2 = (newWord) => {


    const newItem = new ProductModel(newWord);
    return newItem.save();


}


const deleteItem2 = (id) => {
    return ProductModel.findByIdAndDelete(id);

};
const deleteAll = (_) => {
    return ProductModel.deleteMany();

};

const UpdateItem2 = (id, ProductName, ProductPrice,ProductDescription,ProductRate) => {

    return ProductModel.findByIdAndUpdate(id, { ProductName, ProductPrice,ProductDescription,ProductRate }, { new: true });

};


module.exports = { getAllData1, OneItem2, createItem2, deleteItem2, UpdateItem2, deleteAll };
