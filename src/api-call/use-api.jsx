import { useState, useCallback } from "react";
import axios from "axios";
import { getAuthHeader, sessionDestroy } from "../helpers/utils";
import { toast } from "sonner";

const useApi = (endpoint, method = "GET") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(
    async (
      payload = null,
      onSuccess = null,
      customHeaders = {},
      params = {}
    ) => {
      setLoading(true);
      setError(null);
      console.log(`http://localhost:8080/${endpoint}`);

      try {
        const headers = { ...getAuthHeader(), ...customHeaders };
        const response = await axios({
          method,
          url: `http://localhost:8080/${endpoint}`,
          data: payload,
          headers,
          params,
        });

        setData(response.data);
        if (typeof onSuccess === "function") {
          onSuccess(response.data);
        }
        return response.data;
      } catch (err) {
        console.log(err, "error");
        setError(err.response?.data?.message || "Something went wrong!");
        toast.error(err.response?.data?.message || "Something went wrong!");
        if (err.response?.status === 401) {
          sessionDestroy();
        }
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method]
  );

  return { data, loading, error, callApi };
};

export default useApi;
