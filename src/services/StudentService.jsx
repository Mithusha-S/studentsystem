import axios from "axios";



const REST_API_BASE_URL = 'http://localhost:8080/student';
const REST_API_LIST_URL = 'http://localhost:8080/student/getAll';
const REST_API_ADD_URL = 'http://localhost:8080/student/add';




export const listStudents = () => axios.get(REST_API_LIST_URL);
export const addStudent = (student) => axios.post(REST_API_ADD_URL,student)
export const getStudent = (studentId) => axios.get(REST_API_BASE_URL + '/' + studentId)
export const updateStudent = (studentId , student) => axios.put(REST_API_BASE_URL + '/' + studentId, student)
export const deleteStudent = (studentId) => axios.delete(REST_API_BASE_URL + '/' + studentId)



