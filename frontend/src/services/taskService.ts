import axios from "axios";

const API_URL = "http://localhost:30080/tasks";

export const getTasks = () => axios.get(API_URL);
export const searchTask = (name: string) => axios.get(`${API_URL}/search?name=${name}`);
export const deleteTask = (id: string) => axios.delete(`${API_URL}?id=${id}`);
export const runTask = (id: string) => axios.put(`${API_URL}/${id}/executions`);
export const createOrUpdateTask = (task: any) => axios.put(API_URL, task);
