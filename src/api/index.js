import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8080/api',
})

export const getAllMovies = () => api.get(`/exams`)
export const getMovieByName = name => api.get(`/exam/${name}`)

const apis = {
    getAllMovies,
    getMovieByName,
}

export default apis