import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  const { data, error } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
  };
};

export default useCurrentUser;
