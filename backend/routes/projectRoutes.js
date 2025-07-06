const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');


router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);


router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, admin, deleteProject); // Solo administradores pueden eliminar

module.exports = router;