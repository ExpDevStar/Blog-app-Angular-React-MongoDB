/**
 * MainController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function(req, res){
    Blog.find().sort('createdAt desc').done(function(err, blog) {
        res.view('main/index', { blogs: blog});
    });
  },

  post: function(req, res){
    Blog.findOneById(req.param('id')).done(function(err, post) {
      if (err) return next(err);
      if(post){
        res.view('main/post', {post: post});
      }else{
        res.notFound();
      }
    });
  },

  admin: function(req, res){
    res.view('main/admin', {user: req.session.user})
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MainController)
   */
  _config: {}


};
