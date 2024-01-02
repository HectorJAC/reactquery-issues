import { FC } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Issue } from '../interfaces/issue';
import { useGetIssue } from '../hooks/useGetIssue';
import { LoadingIcon } from '../components/LoadingIcon';
import { IssueComments } from '../components/IssueCommets';

interface Props {
    issue?: Issue;
}

export const IssuePage:FC<Props> = () => {
    
    const params = useParams();
    const { id = '0' } = params;

    const {issueQuery, commentsQuery} = useGetIssue(Number(id));

    if (issueQuery.isLoading || commentsQuery.isLoading) {
        return (
            <LoadingIcon />
        );
    }

    if (!issueQuery.data) {
        return (
            <Navigate to='issues/list' />
        )
    }

    return (
        <div className='row mb-5'>
            <div className='col-12 mb-3'>
                <Link to='/issues/list'>Back to issues</Link>
            </div>

            <IssueComments issue={issueQuery.data} />

            {
                commentsQuery.isLoading && <LoadingIcon />
            }

            {
                commentsQuery.data?.map((issue) => (
                    <IssueComments key={issue.id} issue={issue} />
                ))
            }
        </div>
    );
};