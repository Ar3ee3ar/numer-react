const Exam = require('../models/exam-model')

const getExamByMethod = async (req, res) => {
    await Exam.findOne({ method : req.params.method }, (err, exams) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!exams) {
            return res
                .status(404)
                .json({ success: false, error: `not found exam`})
        }
        return res.status(200).json({ success: true, data: exams })
    }).catch(err => console.log(err))
}

const getExam = async (req, res) => {
    await Exam.find({}, (err, exams) => {
        //console.log("Arzeezar in getMovies length of database is --->"+ movies.length)
        return res.status(200).json({ success: true, data: exams })
    }).catch(err => console.log(err))
}

module.exports = {
    getExam,
    getExamByMethod,
}