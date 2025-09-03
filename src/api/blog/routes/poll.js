module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/blogs/:slug/vote',
      handler: 'blog.pollVotes', // Must match the controller method name
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
