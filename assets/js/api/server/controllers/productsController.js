const db = require('../models/database')
const products = db.models.products

const getProducts = async (req, res) => {
  //console.log(db.models)
  console.log(products)
  let allProducts = [];
  try {
    allProducts = await products.findAll();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Huvo un error" })
  }

  return res.status(200).json(allProducts)
}

const getProduct = async (req, res,) => {
  let productId = req.params.id;
  let searchedProduct = null;

  try {
    searchedProduct = await products.findOne({
      where: { id: productId }
    });

  } catch (error) {
    console.error(err);
    if (!searchedProduct) {
      return res.status(404).json({ message: "The product you are looking for does not exists" })
    } else {
      return res.status(400).json({ message: "There was an error" })
    }
  }
  return res.status(200).json(searchedProduct)
}



const createProduct = async (req, res) => {
  let createdProduct = null;
  try {
    createdProduct = await products.create({ ...req.body });
  } catch (err) {
    console.error(err);
    if (err) {
      return res.status(400).json({ message: "There was an error" });
    }
  }

  return res.status(201).json(createdProduct);
}

const updateProduct = async (req, res) => {
  let productId = req.params.id;
  let { title, price, description, image } = req.body;
  let productToUpdate = null;
  try {
    productToUpdate = await products.findByPk(productId)
    productToUpdate = await products.update({
      title: title,
      price: price,
      description: description,
      image: image
    },
      {
        where: {
          id: productId
        }
      })
  } catch (err) {
    console.error(err);
    if (!productToUpdate) {
      return res.status(404).json({ message: 'The product you are trying to update does not exists' })
    } else {
      return res.status(400).json({ message: "There was an error" })
    }
  }
  return res.status(200).json(productToUpdate)
}

const deleteProduct = async (req, res) => {
  let productId = req.params.id;
  let deleteProduct = null;
  try {
    deleteProduct = await products.destroy({
      where: {
        id: productId
      }
    });
  } catch (err) {
    console.error(err);
    if (!deleteProduct) {
      return res.status(404).json({ message: "The product you are trying to delete does not exists" })
    } else {
      return res.status(400).json({ message: "There was an error" })
    }
  }
  return res.status(204).json({ message: "The product has been deleted" })
}

module.exports = {
  getAll: getProducts,
  getOne: getProduct,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct
}