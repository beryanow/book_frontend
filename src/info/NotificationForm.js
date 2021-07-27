import React from "react";
import './styles/NotificationForm.css'

function NotificationForm({active, children, formType}) {
    return (
        <div className={active ? "notificationDescription active" : "notificationDescription"}>
            <div className={active ? "notificationDescriptionContent active " + formType : "notificationDescriptionContent " + formType} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default NotificationForm;