import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    imageId: {
      type: Number, 
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number, 
      required: true,
    },
    gender: {
      type: String, 
      required: true,
    },
    masterCategory: {
      type: String, 
      required: true,
    },
    subCategory: {
      type: String, 
      required: true,
    },
    articleType: {
      type: String, 
      required: true,
    },
    baseColour: {
      type: String, 
      required: true,
    },
    season: {
      type: String, 
      required: true,
    },
    year: {
      type: Number, 
      required: true,
    },
    usage: {
      type: String, 
      required: true,
    },
    productDisplayName: {
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;