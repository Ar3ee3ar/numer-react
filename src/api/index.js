import axios from 'axios'

const api = axios.create({
    baseURL: 'https://ar3ee3ar.github.io/numer-react:8080/api',
})

export const getAllExam = () => api.get(`/exams`)
export const getExamByMethod = name => api.get(`/exams/${name}`)

const apis = {
    getAllExam,
    getExamByMethod,
}

export default apis
