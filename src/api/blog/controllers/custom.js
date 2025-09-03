// src/api/blog/controllers/custom.js
'use strict';

module.exports = {
  async vote(ctx) {
    const { id } = ctx.params;
    const { pollVotes } = ctx.request.body;

    if (!pollVotes || typeof pollVotes !== 'object') {
      return ctx.badRequest('Invalid pollVotes');
    }

    const updatedBlog = await strapi.entityService.update('api::blog.blog', id, {
      data: { pollVotes },
    });

    ctx.send({ ok: true, updatedBlog });
  },
};
