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
// admin movie list
// 挂载至 /xx/xx的中间件，任何指向 /xx/xx 的请求都会执行它
router.get('/admin/movie/list', requiredAdmin, (req, res) => {
    // console.log(res.locals.admin)
    Movie.find({}).populate("category","name")
    .exec((err,movies)=>{
        if (err) {
            console.log(err)
        } else {
            res.render('movieList', {
                title: '当前电影列表',
                movies: movies
            })
        }
    })
})

// userlist
router.get('/admin/user/list', requiredAdmin, (req, res) => {
    User.fetch((err, users) => {
        if (err) {
            console.log(err)
        } else {
            res.render('userList', {
                title: '用户列表页',
                users: users
            })
        }
    }) 
})

// admin movie save
router.get('/admin/movie/add', requiredAdmin, (req, res) => {
    Category.find({}, (err, categories) => {
        res.render('movieAdmin', {
            title: '后台录入页',
            categories: categories,
            movie: {
                title: '',
                doctor: '',
                country: '',
                year: '',
                poster: '',
                flash: '',
                summary: '',
                language: ''
            }
        })
    })
});

// admin update movie
router.get('/admin/movie/update/:id', requiredAdmin, (req, res) => {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, (err, movie) => {
            Category.find({}, (err, categories) => {
                res.render('movieAdmin', {
                    title: '更新页 >' + movie.title,
                    movie: movie,
                    categories: categories
                })
            })
        })
    }
})

// admin post movie
router.post('/admin/movie/new', requiredAdmin, (req, res) => {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id) {
        // console.log("更新");
        Movie.findById(id, (err, movie) => {
            if (err) {
                console.log(err)
            }
            _movie = Object.assign(movie, movieObj);
            _movie.save((err, movie) => {
                if (err) {
                    console.log(err)
                }
                // 添加
                Category.findById(movie.category, (err, category) => {
                    if (category.movies.indexOf(movie._id) > -1) {
                        return
                    } else {
                        category.movies.push(movie._id);
                    }
                    category.save((err, category) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                     // 删除
                    Category.findOne({ "movies": movie._id }, (err, category) => {
                        if(category.movies.length > 0){
                            category.movies.forEach((e, i) => {
                                if (e.toString() === movie._id.toString()) {
                                    category.movies.splice(i, 1)
                                }
                            })
                            category.save((err, category) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("保存成功");
                                }
                            })
                        }
                    })
                })
               
                res.redirect('/');
            })
        })
    } else {
        _movie = new Movie(movieObj);
        var categoryId = movieObj.category;
        var categoryName = movieObj.categoryName;
        if (categoryId || categoryName) {
            _movie.save((err, movie) => {
                if (err) {
                    console.log(err)
                }
                if (categoryId) {
                    Category.findById(categoryId, (err, category) => {
                        category.movies.push(_movie.id);
                        category.save((err, category) => {
                            if (err) {
                                console.log(err)
                            }
                            res.redirect('/movie/' + movie._id)
                        })
                    })
                } else if (categoryName) {
                    var category = new Category({
                        name: categoryName,
                        movies: [movie._id]
                    })
                    category.save((err, category) => {
                        movie.category = category._id;
                        movie.save((err, movie) => {
                            res.redirect('/movie/' + movie._id);
                        })
                    })
                }
            })
        } else {
            var msg = "请选择电影分类！";
            res.redirect(`/status?return_url=/admin/movie/add&code=0&tips=${msg}`);
        }
    }
})

// admin del movie
router.delete('/admin/movie/list', requiredAdmin, (req, res) => {
    var id = req.query.id;
    if (id) {
        Category.findOne({"movies":id},(err,category)=>{
            var index = category.movies.indexOf(id);
            category.movies.splice(index,1);
            category.save((err,category)=>{
                if(err) console.log(err);
            }) 
        })
        Movie.remove({_id: id}, (err, movie) => {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        })
    }
})

// admin del user 
router.delete('/admin/user/list', requiredAdmin, (req, res) => {
    var id = req.query.id;
    if (id) {
        User.remove({
            _id: id
        }, (err, user) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    success: 1
                })
            }
        })
    }
})
router.post('/admin/user/comment', (req, res) => {
    // ajax提交评论直接评论已经实现，对评论人的评论暂未实现
    var _comment = req.body.comment;
    var comment = new Comment(_comment);
    var content = _comment.content
    var movieId = _comment.movie
    console.log(_comment)
    if (_comment.cid) {
        Comment.findById(_comment.cid, (err, comment) => {
            var reply = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content
            }
            comment.reply.push(reply);
            console.log(comment);
            comment.save((err, comment) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("回复评论人", comment)
                    res.redirect("/movie/" + movieId)
                }
            })
        })
    } else {
        comment.save((err, comment) => {
            if (err) {
                console.log(err)
            } else {
                console.log("直接评论", comment)
                    // Comment.find({content: content})
                    // .populate("from","name")
                    // .exec((err, comments) => {
                    //     res.send(comments)
                    // })
                res.redirect("/movie/" + movieId)
            }
        })
    }

})
module.exports = router;