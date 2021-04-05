const express = require('express')

const MovieCtrl = require('../controllers/exam-ctrl')

const router = express.Router()

router.get('/exam/:method', MovieCtrl.getMovieByName)
router.get('/exams', MovieCtrl.getMovies)

module.exports = router