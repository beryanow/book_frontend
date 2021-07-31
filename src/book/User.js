import React from "react";

function User({name}) {
    return (
        <h1 className={"bigTitle"} style={{textAlign: "right", marginRight: "20px"}}>
            {name}
        </h1>
    );
}

export default User;