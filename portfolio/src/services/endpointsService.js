import axios from "axios";
import { gitApi } from "../config";

export const fetchRepos = axios.create({
  baseURL: `${gitApi.URL}`,
  method: "GET",
});
