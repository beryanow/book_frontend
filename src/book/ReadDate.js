import React from "react";

function ReadDate({date, className}) {
    const dateObject = new Date(date);

    const localizedDate = dateObject.toLocaleDateString("ru");
    const localizedTime = dateObject.toLocaleTimeString("ru").match(/\d{2}:\d{2}|[AMP]+/g).join(' ');

    return (
        <div className={className}>
            {"✓ " + localizedDate + "  I  " + localizedTime}
        </div>
    );
}

export default ReadDate;