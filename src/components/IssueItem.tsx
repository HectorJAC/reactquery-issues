import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { FiMessageSquare, FiInfo, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from "../interfaces/issue";
import { timeSince } from "../helpers/functions";

interface Props {
    issue: Issue;
}

export const IssueItem:FC<Props> = ({issue}) => {
    
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const preSetData = () => {
        queryClient.setQueryData(
            ['issue', issue.id],
            issue
        );
    };

    return (
        <div
            className="card mb-2 issue"
            onClick={() => {
                preSetData();
                navigate(`/issues/issue/${issue.id}`);
            }}
        >
            <div className="card-body d-flex align-items-center">
                {
                    issue.state === State.Open 
                    ? <FiInfo size={32} color='red' />
                    : <FiCheckCircle size={32} color='green' />
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issue.title}</span>
                    <span className="issue-subinfo">
                        #{issue.number} opened {timeSince(issue.created_at)} ago by 
                        <span className="fw-bold"> {issue.user.login}</span>
                    </span>

                    <div>
                        {
                            issue.labels.map((label) => (
                                <span
                                    key={label.id}
                                    className="badge rounded-pill m-1"
                                    style={{backgroundColor: `#${label.color}`, color: 'black'}}
                                >
                                    {label.name}
                                </span>
                            ))
                        }
                    </div>

                </div>

                <div className="d-flex align-items-center">
                    <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className="px-2">{issue.comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    );
};
