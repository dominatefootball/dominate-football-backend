import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::blog.blog', ({ strapi }) => ({
  async pollVotes(ctx: any) {
    console.log('🗳️ Backend: pollVotes endpoint called!');
    console.log('🗳️ Backend: Request params:', ctx.params);
    console.log('🗳️ Backend: Request body:', ctx.request.body);
    
    try {
      const { slug } = ctx.params;
      const { optionId } = ctx.request.body;
      
      // Validate input
      if (!slug || optionId === undefined) {
        return ctx.throw(400, 'Missing required parameters');
      }
      
      // Validate optionId is a valid option (0, 1, or 2)
      if (![0, 1, 2, '0', '1', '2'].includes(optionId)) {
        return ctx.throw(400, 'Invalid option ID');
      }
      
      console.log('🗳️ Backend: Looking for blog with slug:', slug);
      console.log('🗳️ Backend: Vote option ID:', optionId);
      
      // Find blog by slug using entityService
      const blogs = await strapi.entityService.findMany('api::blog.blog', {
        filters: { slug: { $eq: slug } },
      });
      
      console.log('🗳️ Backend: Found blogs:', blogs?.length);
      
      if (!blogs || blogs.length === 0) {
        console.log('❌ Backend: Blog not found');
        return ctx.throw(404, 'Blog not found');
      }
      
      const blog = blogs[0];
      console.log('🗳️ Backend: Blog found:', blog.id, blog.title);
      console.log('🗳️ Backend: Current pollVotes:', blog.pollVotes);
      
      // Initialize or get current votes
      const currentVotes = blog.pollVotes || { "0": 0, "1": 0, "2": 0 };
      
      // Increment the vote for the selected option
      const optionKey = optionId.toString();
      currentVotes[optionKey] = (currentVotes[optionKey] || 0) + 1;
      console.log('🗳️ Backend: Updated votes:', currentVotes);
      
      // Update the blog with new vote counts
      const updatedBlog = await strapi.entityService.update('api::blog.blog', blog.id, {
        data: { pollVotes: currentVotes },
      });
      
      console.log('✅ Backend: Blog updated successfully');
      console.log('✅ Backend: Updated blog pollVotes:', updatedBlog.pollVotes);
      
      // Calculate total votes
      const totalVotes = Object.values(currentVotes).reduce((sum: number, count: number) => sum + count, 0);
      
      // Return success response
      ctx.body = { 
        success: true, 
        pollVotes: currentVotes,
        totalVotes: totalVotes,
        message: 'Vote recorded successfully'
      };
      
    } catch (error) {
      console.error('❌ Backend: Vote endpoint error:', error);
      
      // Handle specific error types
      if (error.status) {
        return ctx.throw(error.status, error.message);
      }
      
      // Generic server error
      ctx.throw(500, 'Internal server error while processing vote');
    }
  },
}));
