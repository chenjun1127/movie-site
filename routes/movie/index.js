var express = require('express');
var router = express.Router();
var Movie = require('../../models/movie');
var Comment = require('../../models/comment');
var Category = require('../../models/category');
// index
router.get('/', (req, res) => {
	Category.find({}).limit(4)
    .populate({path: "movies",options: {limit: 4}})
    .exec((err, categories) => {
        if (err) {
            console.log(err)
        } else {
            // console.log("categories",categories)
            res.render('index', {
                title: '首页',
                categories: categories
            })
        }
    })
})

// detail
router.get('/movie/:id', (req, res) => {
	var id = req.params.id; 
	Movie.update({_id: id}, {'$inc': {'pv': 1}}, (err) => {
		if (err) console.log(err);
	})
	Movie.findById(id, (err, movie) => {
		Comment.find({movie: id})
        .populate("from", "name img")
        .populate("reply.from reply.to", "name img")
        .exec((err, comments) => {
            console.log("comments",comments)
            res.render('detail', {
                title: '详情页 > ' + movie.title,
                movie: movie,
                comments: comments
            });
        })
	})
})
router.get('/movie/category/result', (req, res) => {
	var size = 8; // 一页8个
	var categoryId = req.query.cat;
    var pageSize = parseInt(req.query.pageSize);
    var totalSize = 0; // 一共有多少数据；   
    res.locals.categoryId = categoryId;
	Category.findById(categoryId, (err, category) => {
		totalSize = category.movies.length;
        var page = Math.ceil(totalSize / size) //分多少页
        Category.find({_id: categoryId})
        .populate({ path: "movies", options: { limit: size ,skip: (pageSize-1) * size} })
        .exec((err, categoris) => {
            // console.log(categoris)
            if (err) console.log(err);
            res.render('categoryResult', {
                title: '当前类别',
                categoris: categoris,
                page:page,
                categoryId:categoryId,
                pageSize:pageSize,
            })
        })
        
	})
})

// search
router.post('/search',(req,res)=>{
    // var pageSize = req.query.pageSize;
    var q = req.body.query;
    var reg = new RegExp(q+'.*','i');
    var totalSize = 0;
    Movie.find({title:reg},(err,movies)=>{
        if(movies.length<=0){
            Category.find({name:reg}).populate("movies","poster title").exec((err,categories)=>{
                categories.forEach((ele,index)=>{
                    // console.log(ele.movies.length)
                    totalSize += ele.movies.length;
                })
                res.render('search',{
                    title: '搜索页',
                    categories:categories,
                    number:totalSize,
                    keywords:q,       
                })
            })
        }else{
            res.render('search',{
                title: '搜索页',
                movies:movies,
                number:movies.length,
                keywords:q
            }) 
        }
    })
    
})

module.exports = router;