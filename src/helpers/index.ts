import axios from "axios";

export const fetcher = (url: string, token: string) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);
