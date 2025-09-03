module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/poll/vote',
      handler: 'poll.vote',
      config: {
        auth: false, // or true if you want authenticated only
      },
    },
  ],
};
