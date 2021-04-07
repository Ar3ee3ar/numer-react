const express = require('express')

const ExamCtrl = require('../controllers/exam-ctrl')

const router = express.Router()

router.get('/exams/:method', ExamCtrl.getExamByMethod)
router.get('/exams', ExamCtrl.getExam)

module.exports = router