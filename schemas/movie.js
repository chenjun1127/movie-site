var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    poster: String,
    summary: String,
    year: Number,
    flash:String,
    pv:{
        type:Number,
        default:0
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})
// 为模式添加新的方法
MovieSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next()
})
MovieSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}
module.exports = MovieSchema;
