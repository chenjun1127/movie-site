var express = require('express');
var router = express.Router();
var Movie = require('../../models/movie');
var User = require('../../models/user');
var Comment = require('../../models/comment');
var Category = require('../../models/category');
// 权限中间件
var {requiredLogin,requiredAdmin} = require ('../middleware/auth');
// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
router.use(requiredLogin); 
// admin category
// 挂载至 /xx/xx的中间件，任何指向 /xx/xx 的请求都会执行它
router.get('/admin/category/new',requiredAdmin, (req, res) => {
    res.render('category', {
        title: '电影分类录入页',
        category:{},
    })
})

// admin post movie
router.post('/admin/category',requiredAdmin, (req, res) => {
    var categoryObj = req.body.category;
    var id = categoryObj._id;
    var name = categoryObj.name;
    if(id){        
        Category.findById(id,(err,category)=>{        
            category.name = name;
            category.save((err, category) => {
                if (err) {
                    console.log(err)
                }
                res.redirect('/admin/category/list' );
            })
        })
    }else{ 
        var category = new Category(categoryObj);
        category.save((err, category) => {
            if (err) {
                console.log(err)
            }
            res.redirect('/admin/category/list' );
        })
    }
})
// admin category list
router.get('/admin/category/list',requiredAdmin, (req, res) => {
    Category.fetch((err, categories) => {
        if (err) {
            console.log(err)
        } else {
            res.render('categoryList', {
                title: '电影分类列表页',
                categories: categories
            })
        }
    })
})

router.get('/admin/category/update/:id',requiredAdmin,(req,res) => {
    var id = req.params.id;
    if (id) {       
        Category.findById(id, (err, category) => {
            console.log(category)
            res.render('category', {
                title: '电影分类更新页 > ' + category.name ,                 
                category: category
            })
        })
    }
})

router.delete('/admin/category/del',requiredAdmin,(req,res) =>{
    var id = req.query.id;
    if (id) {
        Movie.find({category:id},(err,movies)=>{
            console.log(movies);
            movies.forEach((ele,index)=>{
                ele.remove();
            })
        })
        Category.remove({_id: id}, (err, movie) => {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1});
            }
        })
    }
})

module.exports = router;