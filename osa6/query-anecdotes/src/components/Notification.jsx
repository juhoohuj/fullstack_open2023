import React, { useEffect } from "react";
import { useNotification } from "./NotificationContext";  // Adjust path as necessary

const Notification = () => {
  const { notifications, dispatch } = useNotification();
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  useEffect(() => {
    const timers = notifications.map(notification =>
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', id: notification.id });
      }, 5000)
    );

    // Clear timeouts on cleanup
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [notifications, dispatch]);

  return (
    <div>
      {notifications.map(notification => (
        <div key={notification.id} style={style}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
