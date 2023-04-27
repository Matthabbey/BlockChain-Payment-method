const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    currency: {
      type: String,
      trim: true,
      required: [true, 'Please provide currency'],
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    amount: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    walletID: {
      type: String,
      required: [true, 'Please provide walletID'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    paymentMethod: {
      type: String,
      required: [true, 'Please provide paymentMethod'],
      enum: ['bank-transfer', 'paypal', 'credit-card'],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    //   required: true,
    },
  }
//   { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
});

ProductSchema.pre('remove', async function (next) {
  await this.model('Review').deleteMany({ product: this._id });
});

module.exports = mongoose.model('Payment', ProductSchema);
