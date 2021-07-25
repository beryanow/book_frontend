import React from "react";
import QuotePaginationIndicator from "./QuotePaginationIndicator";

function QuotePaginationIndicatorsField({ currentIndicator, quoteIndicatorsAmount, setCurrentIndicator, updatePartedQuotesArray }) {
    return (
            <div className={"quoteIndicatorField"}>
                {[...Array(quoteIndicatorsAmount)].map((number, index) => {
                    if (index === currentIndicator) {
                        return <QuotePaginationIndicator classname={"quoteIndicator active transition"}
                                                         key={index}
                                                         selectedIndicatorIndex={index}
                                                         setCurrentIndicator={setCurrentIndicator}
                                                         updatePartedQuotesArray={updatePartedQuotesArray}/>;
                    }
                    return <QuotePaginationIndicator classname={"quoteIndicator transition"}
                                                     key={index}
                                                     selectedIndicatorIndex={index}
                                                     setCurrentIndicator={setCurrentIndicator}
                                                     updatePartedQuotesArray={updatePartedQuotesArray}/>;
                })}
            </div>
    );
}

export default QuotePaginationIndicatorsField;