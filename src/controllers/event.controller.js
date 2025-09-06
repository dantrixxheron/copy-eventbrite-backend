import * as Events from '../services/event.service.js';

export async function list(req, res, next) {
  try {
    const items = await Events.listPublished();
    res.json({ items });
  } catch (e) { next(e); }
}

export async function listOccupied(req, res, next) {
  try {
    const eventId = req.params.id
    const result = await Events.listOccupiedSeats(eventId)

    if (!result) return res.status(404).json({ message: 'Event not found' })

    res.json(result)
  } catch (e) {
    next(e)
  }
}


export async function get(req, res, next) {
  try {
    const item = await Events.getById(req.params.id);
    res.json({ item });
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try {
    const item = await Events.createEvent(req.body, req.user.sub);
    res.status(201).json({ item });
  } catch (e) { next(e); }
}