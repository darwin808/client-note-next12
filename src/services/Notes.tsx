import useSWR from "swr"
import { Api } from "."

const fetcher = (url: any) =>
  Api.get(url)
    .then((e: any) => e.data)
    .catch((e: any) => e.error)

export const useNotes = () => {
  const { data, error } = useSWR("/notes", fetcher)

  return {
    data,
    loading: !error && !data,
    error: error
  }
}
