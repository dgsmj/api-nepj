const postsData = require('../data/posts-data');

exports.getPosts = function () {
    return postsData.getPosts();
};

exports.getPost = (id) => {
    return postsData.getPost(id);
};

exports.savePost = function (post) {
    return postsData.savePost(post);
};

exports.updatePost = function (id, post) {
    return postsData.updatePost(id, post);
};

exports.deletePost = function (id) {
    return postsData.deletePost(id);
};