import { Hono } from 'hono';
import { requireAuth } from '../../../shared/middleware/auth.middleware';
import { contactService } from '../services/contact.service';
import { createContactSubmissionSchema, updateContactStatusSchema } from '../validations/contact.validation';

export const contactController = new Hono();

contactController.post('/', async (c) => {
  const body = createContactSubmissionSchema.parse(await c.req.json());
  const submission = await contactService.create(body);
  return c.json(submission, 201);
});

contactController.get('/', requireAuth, async (c) => {
  const submissions = await contactService.listAll();
  return c.json(submissions);
});

contactController.patch('/:id/status', requireAuth, async (c) => {
  const body = updateContactStatusSchema.parse(await c.req.json());
  const submission = await contactService.updateStatus(c.req.param('id'), body.status);
  return c.json(submission);
});
