import React from "react";
import "../custom/NotificationComponent.css";

interface Props {
  title: string;
  content: string;
  onClose: () => void;
}

const NotificationComponent: React.FC<Props> = ({
  title,
  content,
  onClose,
}) => {
  return (
    <div className="notification" onClick={onClose}>
      <div className="notification-content">
        <h3 className="notification-title">{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default NotificationComponent;
