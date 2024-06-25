import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 6
    
    const page = Number(req.query.pageNumber) || 1
  
    const keyword = req.query.keyword
      ? {
          productDisplayName: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
  
    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
  
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch all products without keyword
// @route   GET /api/products/all
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler( async (req, res) => {

    const product = await Product.findById(req.params.id)

    if(product){
        return res.json(product)
    }

    res.status(404).json({ message: 'Product not found' })
})

const getProductByCategory = asyncHandler( async (req, res) => {

    const pageSize = 6
    
    const page = Number(req.query.pageNumber) || 1

    let gender = req.params.gender

    const keyword = req.query.keyword
    ? {
        productDisplayName: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

    if( gender == 'women' ) gender = "Women"
    else if( gender == 'men' ) gender = "Men"

    const products = await Product.find({ 'gender': gender }).find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    const count = await Product.find({ 'gender': gender}).countDocuments({ ...keyword })

    if (products) {
        return res.json({ products, page, pages: Math.ceil(count / pageSize) })
    }

    res.status(404).json({ message: 'Products not found'})
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private / Admin
const createProduct = asyncHandler( async (req, res) => {

    const product = new Product({
        user: req.user._id,
        imageId: 123,
        image: 'No image',
        price: 0,
        gender: 'Sample Gender',
        masterCategory: 'Sample Master Category',
        subCategory: 'Sample Sub Category',
        articleType: 'Sample Article Type',
        baseColour: 'Sample Base Colour',
        season: 'Sample Season',
        year: '2001',
        usage: 'Sample Usage',
        productDisplayName: 'Sample name',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private / Admin
const updateProduct = asyncHandler( async (req, res) => {
    const { imageId,
            image,
            price, 
            gender,
            masterCategory, 
            subCategory, 
            articleType, 
            baseColour, 
            season, 
            year, 
            usage, 
            productDisplayName 
        } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {

        product.imageId = imageId
        product.image = image
        product.price = price
        product.gender = gender
        product.masterCategory = masterCategory
        product.subCategory = subCategory
        product.articleType = articleType
        product.baseColour = baseColour
        product.season = season
        product.year = year
        product.usage = usage
        product.productDisplayName = productDisplayName

        const updatedProduct = await product.save()
        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Resource not found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private / Admin
const deleteProduct = asyncHandler( async (req, res) => {

    const product = await Product.findById(req.params.id)

    if (product) {
        await Product.deleteOne({ _id: product._id })
        res.status(200).json({ message: 'Product deleted '})
        
    } else {
        res.status(404)
        throw new Error('Resource not found')
    }
})

export { 
    getProducts,
    getAllProducts,
    getProductById,
    getProductByCategory,
    createProduct, 
    updateProduct, 
    deleteProduct 
}