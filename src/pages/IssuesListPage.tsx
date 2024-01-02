import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LoadingIcon } from "../components/LoadingIcon";
import { useGetIssuesList } from "../hooks/useGetIssuesList";
import { State } from "../interfaces/issue";
import { LabelPicker } from "../components/LabelPicker";

export const IssuesListPage = () => {
    
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
    const [state, setState] = useState<State>();

    const { issueQuery, page, nextPage, prevPage, homePage } = useGetIssuesList({state, labels: selectedLabels});

    const onLabelChanged = (labelName: string) => {
        (selectedLabels.includes(labelName))
            ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
            : setSelectedLabels([...selectedLabels, labelName]);
    };
    
    return (
        <div className="row mt-5">
            <div className="col-8">
                {
                    issueQuery.isLoading
                    ? <LoadingIcon />
                    : <IssueList 
                        issues={issueQuery.data || []}
                        state={state}
                        onStateChange={(newState) => setState(newState)}
                    />
                }

                <div className="d-flex mt-2 justify-content-between align-items-center">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => prevPage()}
                        disabled={issueQuery.isFetching}
                    >
                        Prev
                    </button>

                    <button
                        className="btn btn-outline-primary"
                        onClick={() => homePage()}
                        disabled={issueQuery.isFetching}
                    >
                        Home
                    </button>

                    <span>Page {page}</span>

                    <button
                        className="btn btn-outline-primary"
                        onClick={() => nextPage()}
                        disabled={issueQuery.isFetching}
                    >
                        Next
                    </button>
                </div>
            </div> 

            <div className="col-4">
                <LabelPicker 
                    selectedLabels={selectedLabels}
                    onchange={(labelName) => onLabelChanged(labelName)}
                />
            </div>
        </div>
    );
};