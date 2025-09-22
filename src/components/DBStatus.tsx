import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectIsDBConnected,
  selectIsPolling,
  startPolling,
  stopPolling,
} from "../store/slices/dbSlice";
import type { AppDispatch } from "../store";

const DBStatus = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isConnected = useSelector(selectIsDBConnected);
  const isPolling = useSelector(selectIsPolling);

  useEffect(() => {
    if (isConnected !== "connected") {
      dispatch(startPolling());
    }

    return () => {
      dispatch(stopPolling());
    };
  }, [dispatch]);

  const statusMap = {
    connected: { color: "bg-green-600", label: "Connected" },
    disconnected: { color: "bg-red-600", label: "Disconnected" },
    unknown: { color: "bg-gray-400", label: "Unknown" },
  };

  const status = statusMap[isConnected] || statusMap.unknown;

  return (
    <div className="flex justify-end text-sm p-1">
      <div className="flex items-center font-bold space-x-2">
        <span>DB Status:</span>
        <span className={`h-[12px] w-[12px] rounded ${status.color}`}></span>
        <span className={`${status.color}`}>{status.label}</span>
        {isPolling && <span className="text-xs text-gray-500">(retrying...)</span>}
      </div>
    </div>
  );
};

export default DBStatus;
