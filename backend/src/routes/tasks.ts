import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import Task from '../models/Task';

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const user = req.userId;
    const task = new Task({ title, description, dueDate, user });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Task creation failed' });
  }
});


router.get('/', async (req, res) => {
  try {
    const user = req.userId;
    console.log('User ID:', user);
    const tasks = await Task.find({ user });
    console.log('Fetched tasks:', tasks);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, isCompleted } = req.body;
    const user = req.userId;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user },
      { title, description, dueDate, isCompleted },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Task update failed' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.userId;
    const deletedTask = await Task.findOneAndDelete({ _id: id, user });
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Task deletion failed' });
  }
});

export default router;
