import { FC } from "react";
import ReactMarkdown from 'react-markdown'
import { Issue } from "../interfaces/issue";

interface Props {
    issue: Issue;
}

export const IssueComments:FC<Props> = ({issue}) => {
    return (
        <div className="col-12">
            <div className="card border-white mt-2">
                <div className="card-header bg-dark">
                    <img src={issue.user.avatar_url} alt="Icono Usuario" className="avatar"/>
                    <span className="mx-2 text-white">{issue.user.login}</span>
                </div>
                <div className="card-body text-dark">
                    <ReactMarkdown>
                        {`${issue.body}`}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};
