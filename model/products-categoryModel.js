const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema({
    title: String,
    product_category_id: {
        type: String,
        default: ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    featured: String,
    position: Number,
    slug: {
        type: String,
        slug:"title",
        unique: true
    },
    createBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
},{
    timestamps: true
})

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "Products-category");


module.exports = ProductCategory;