import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubIndustries } from "@/redux/actions/configurationAction";
import { notification } from "antd";

export const useSubIndustries = (params = {}) => {
  const {
    refresh = false,
    setRefresh = null,
    configType = null,
    config = false,
  } = params;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.subIndustry.getAllSubIndustries
  );
  const [subIndustries, setSubIndustries] = useState(data?.data);

  const fetchAllSubIndustries = useCallback(() => {
    if (!data || refresh) {
      dispatch(getAllSubIndustries(config));
      setRefresh && setRefresh(false);
    }
  }, [dispatch, data, refresh]);

  useEffect(() => {
    if (!configType || configType == "sub-industry") fetchAllSubIndustries();
  }, [fetchAllSubIndustries, configType]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data?.status === "success") {
      setSubIndustries(data?.data);
      setLoading(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to  fetch Sub Industries",
      });
    }
  }, [status, data, setRefresh]);

  const transformedSubIndustries = useMemo(() => {
    return subIndustries?.map(({ _id, label }) => ({
      value: _id,
      text: label,
    }));
  }, [subIndustries]);

  return { subIndustries: transformedSubIndustries ?? [], loading };
};
