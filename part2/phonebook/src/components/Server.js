import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const create = (newObject) => {
    axios.post(baseUrl, newObject)
}
  
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return (request)
}

const DeletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { create, update, DeletePerson }
