import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { requireAuth } from '../../../shared/middleware/auth.middleware';
import { blogService } from '../services/blog.service';
import { blogSchema } from '../validations/blog.validation';

export const blogController = new Hono();

blogController.get('/', async (c) => {
  const blogs = await blogService.listPublic();
  return c.json(blogs);
});

blogController.get('/admin', requireAuth, async (c) => {
  const blogs = await blogService.listAll();
  return c.json(blogs);
});

blogController.get('/:slug', async (c) => {
  const blog = await blogService.getBySlug(c.req.param('slug'));
  if (!blog) {
    throw new HTTPException(404, { message: 'Blog post not found' });
  }
  return c.json(blog);
});

blogController.post('/', requireAuth, async (c) => {
  const body = blogSchema.parse(await c.req.json());
  const blog = await blogService.create(body);
  return c.json(blog, 201);
});

blogController.patch('/:id', requireAuth, async (c) => {
  const body = blogSchema.partial().parse(await c.req.json());
  const blog = await blogService.update(c.req.param('id'), body);
  return c.json(blog);
});

blogController.delete('/:id', requireAuth, async (c) => {
  const blog = await blogService.softDelete(c.req.param('id'));
  return c.json(blog);
});
