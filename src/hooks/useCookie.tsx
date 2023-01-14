import { useCookies } from "react-cookie";

export default function useCookie<T>(name: string, options = {}) {
  const [cookies, setCookies, removeCookies] = useCookies([name]);
  const optionsWithPath = { path: "/", ...options };
  return [
    cookies[name] as T | undefined,
    (value: T) => setCookies(name, value),
    () => removeCookies(name, optionsWithPath),
  ] as const;
}
