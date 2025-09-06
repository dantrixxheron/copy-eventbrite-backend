import { Event } from '../models/Event.js';
import { Ticket } from '../models/Ticket.js';
import { AppError } from '../utils/errors.js';

export async function listPublished() {
  return Event.find({ isPublished: true }).sort({ date: 1 }).lean();
}

export async function listOccupiedSeats(eventId) {
  const ev = await Event.findById(eventId).lean()
  if (!ev) return null 
  
  if (ev.seatMap?.type === 'ga') {
    return { occupied: [] }
  }

  const tickets = await Ticket.find({ event: eventId }, { _id: 0, seat: 1 }).lean()
  const occupied = tickets.map(t => t.seat)
  return { occupied }
}

export async function getById(id) {
  const e = await Event.findById(id).lean();
  if (!e) throw new AppError('Event not found', 404, 'EVENT_NOT_FOUND');
  return e;
}

export async function createEvent(input, ownerId) {
  const e = await Event.create({ ...input, owner: ownerId });
  return e.toObject();
}