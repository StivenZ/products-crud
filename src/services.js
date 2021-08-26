const ProductModel = require('./db/models/Product.Model');

async function create(body) {
    const newProduct = await ProductModel.create(body);
    return newProduct;
}

async function edit(id, reqBody, isNew) {
    const editedProduct = await ProductModel.findByIdAndUpdate(id, reqBody, isNew);
    return editedProduct;
}

async function deleteOne (id) {
    const deletedProduct = await ProductModel.findByIdAndRemove(id);
    return deletedProduct;
}

async function listOne(id) {
    const product = await ProductModel.findById(id);
    return product;
}

async function listAll() {
    const products = await ProductModel.find();
    return products;
}

module.exports = {
    create,
    edit,
    deleteOne,
    listOne,
    listAll
}