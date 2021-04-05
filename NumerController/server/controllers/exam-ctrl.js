const Movie = require('../models/exam-model')

const getMovieByName = async (req, res) => {
    await Movie.findOne({ method : req.params.method }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `!!!!!!!!!!!!!!!!!!1`})
        }
        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

const getMovies = async (req, res) => {
    await Movie.find({}, (err, movies) => {
        console.log("Arzeezar in getMovies")
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `!!!!!!!!!!!!!!!1111` })
        }
        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}

module.exports = {
    getMovies,
    getMovieByName,
}