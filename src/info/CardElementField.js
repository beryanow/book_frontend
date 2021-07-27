import React from "react";

function CardElementField({content, className}) {
    return (
        <div className={className + " transition"}>
            {content}
        </div>
    );
}

export default CardElementField;