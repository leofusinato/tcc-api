import { Request, Response } from 'express';
import { Between, getRepository } from 'typeorm';
import CheckinMedication from '../models/CheckinMedication';
import User from '../models/User';
import { getUserTasks } from '../utils/sql';

class HomeController {
  async index(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const checkinsRepository = getRepository(CheckinMedication);

    const user = await userRepository.findOne(
      { id: req.userId },
      {
        relations: [
          'ageds',
          'ageds.medications',
          'ageds.medications.schedules',
        ],
      }
    );
    const date = new Date();
    const dateStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const completedTasks = await checkinsRepository.find({
      where: { created_at: Between(dateStart, date) },
      relations: ['medication', 'medication.aged'],
    });

    const nextTasks = await getUserTasks(req.userId, new Date());
    if (!nextTasks) {
      return res.sendStatus(400);
    }
    return res.json({ ageds: user.ageds, tasks: completedTasks, nextTasks });
  }
}

export default new HomeController();
