'use strict';

module.exports = {
  async vote(ctx) {
    const { slug, option } = ctx.request.body;

    if (!slug || !option) {
      return ctx.badRequest('Missing slug or option');
    }

    const existing = await strapi.entityService.findMany('api::poll.poll', {
      filters: { slug },
    });

    if (!existing.length) {
      return ctx.notFound('Poll not found');
    }

    const poll = existing[0];
    const updatedVotes = {
      ...poll.votes,
      [option]: (poll.votes?.[option] || 0) + 1,
    };

    const updated = await strapi.entityService.update('api::poll.poll', poll.id, {
      data: {
        votes: updatedVotes,
      },
    });

    ctx.send({ success: true, updatedVotes: updated.votes });
  },
};
