import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/notifications")
      .then((res) => {
        const data = res.data;
        setNotifications(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
        setNotifications([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900 dark:border dark:border-gray-800">
      <h1 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">
        Notification
      </h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">
          loding notification .... 
        </p>
      ) : notifications.length > 0 ? (
        <ul className="space-y-3">
          {notifications.map((n: any) => (
            <li
              key={n.id}
              className="flex justify-between p-3 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {n.text}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {n.date} - {n.user}
                </span>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  n.status === "unread"
                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                    : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                }`}
              >
                {n.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400"></p>
      )}
    </div>
  );
}
