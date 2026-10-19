import { Hono } from 'hono';
import { z } from 'zod';
import { requireAuth } from '../../../shared/middleware/auth.middleware';
import { OrderedDoc, OrderedListService } from '../services/ordered-list.service';

/**
 * Shared route wiring for the ordered-list resources — same pairing as
 * OrderedListService. Public GET (production-only), admin-only create
 * /update/soft-delete behind requireAuth.
 */
export function createOrderedListController<T extends OrderedDoc, Shape extends z.ZodRawShape>(
  service: OrderedListService<T>,
  schema: z.ZodObject<Shape>
) {
  const controller = new Hono();

  controller.get('/', async (c) => {
    const items = await service.listPublic();
    return c.json(items);
  });

  controller.get('/admin', requireAuth, async (c) => {
    const items = await service.listAll();
    return c.json(items);
  });

  controller.post('/', requireAuth, async (c) => {
    const body = schema.parse(await c.req.json()) as Partial<T>;
    const item = await service.create(body);
    return c.json(item, 201);
  });

  controller.patch('/:id', requireAuth, async (c) => {
    const body = schema.partial().parse(await c.req.json()) as Partial<T>;
    const item = await service.update(c.req.param('id'), body);
    return c.json(item);
  });

  controller.delete('/:id', requireAuth, async (c) => {
    const item = await service.softDelete(c.req.param('id'));
    return c.json(item);
  });

  return controller;
}
