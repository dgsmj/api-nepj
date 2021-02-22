const postService = require('../service/posts-service');

const axios = require('axios');

const request = function (url, method, data) {
    return axios({ url, method, data });
}

test('Deve retornar os posts', async function () {

    const post1 = await postService.savePost({
        title: 'any title 1',
        content: 'any content 1'
    });

    const post2 = await postService.savePost({
        title: 'any title 2',
        content: 'any content 2'
    });

    const post3 = await postService.savePost({
        title: 'any title 3',
        content: 'any content 3'
    });

    const response = await request('http://localhost:3000/api/posts', 'get');
    
    const posts = response.data;

    expect(posts).toHaveLength(3);

    await postService.deletePost(post1.id);
    await postService.deletePost(post2.id);
    await postService.deletePost(post3.id);
});

test('Deve criar um post', async function () {

    const data = {
        title: 'any title',
        content: 'any content'
    };

    const response = await request('http://localhost:3000/api/posts', 'post', data);

    const post = response.data;

    expect(post.title).toBe(data.title);
    expect(post.content).toBe(data.content);

    await postService.deletePost(post.id);
});

test('Deve atualizar um post', async function () {

    const post = await postService.savePost({
        title: 'any title',
        content: 'any content'
    });
    post.title = 'any title updated';
    post.content = 'any content updated';

    await request(`http://localhost:3000/api/posts/${post.id}`, 'put', post);

    const updatePost = await postService.getPost(post.id);

    expect(updatePost.title).toBe(post.title);
    expect(updatePost.content).toBe(post.content);

    await postService.deletePost(post.id);
});

test('Deve retornar um post', async function () {

    const post = await postService.savePost({
        title: 'any title',
        content: 'any content'
    });

    const getPost = await request(`http://localhost:3000/api/posts/${post.id}`, 'get');

    expect(getPost.data.title).toBe(post.title);
    expect(getPost.data.content).toBe(post.content);

    await postService.deletePost(post.id);
});

test('Deve deletar um post', async function () {

    const post = await postService.savePost({
        title: 'any title',
        content: 'any content'
    });

    await request(`http://localhost:3000/api/posts/${post.id}`, 'delete', post);

    const checkPost = await request(`http://localhost:3000/api/posts/${post.id}`, 'get');

    expect(checkPost.data).toBeNull();
});