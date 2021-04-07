import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8080/api',
})

export const getAllExam = () => api.get(`/exams`)
export const getExamByMethod = name => api.get(`/exams/${name}`)

const apis = {
    getAllExam,
    getExamByMethod,
}

export default apis