import React from "react";

function QuotePaginationIndicator({ classname, selectedIndicatorIndex, setCurrentIndicator, updatePartedQuotesArray }) {
    return <div className={classname}
                onClick={() => {
                    setCurrentIndicator(selectedIndicatorIndex);
                    updatePartedQuotesArray(selectedIndicatorIndex);
                }}
    />
}

export default QuotePaginationIndicator;