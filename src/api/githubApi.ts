import axios from "axios";
import { baseURL, githubToken } from "../helpers/constants";

export const githubApi = axios.create({
    baseURL: `${baseURL}`,
    headers: {
        Authorization: `Bearer ${githubToken}`
    },
});