import axios from "axios";

export const getAllBoards = () => {
    return axios.get("/boards");
};

export const getTaskByBoardId = (id) => {
    return axios.get(`/tasks/boardId/${id}`);
};

export const createBoard = (data) => {
    return axios.post("/boards", data);
};

export const createTask = (data) => {
    return axios.post("/tasks", data);
};