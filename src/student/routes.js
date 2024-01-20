const { Router } = require('express');
const controller = require('./controller');
const router = Router();

//get method
router.get('/', controller.getStudents);
router.get('/:id', controller.getStudentById); 

//post method
router.post('/',controller.addStudent);

//Delete Method
router.delete('/:id', controller.removeStudent); 

//PUT Method
router.put('/:id', controller.updateStudent); 



module.exports = router;
