import axios from "axios";

export const fetcher = (url: string, token: any) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);
