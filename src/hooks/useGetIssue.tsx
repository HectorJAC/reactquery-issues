import { useQuery } from '@tanstack/react-query';
import { Issue } from '../interfaces/issue';
import { githubApi } from '../api/githubApi';

export const getIssueInfo = async (issueId: number):Promise<Issue> => {
    const { data } = await githubApi.get<Issue>(`/issues/${issueId}`);
    return data;
};

export const getIssueComments = async (issueId: number):Promise<Issue[]> => {
    const { data } = await githubApi.get<Issue[]>(`/issues/${issueId}/comments`);
    return data;    
}

export const useGetIssue = (issueId: number) => {
    
    const issueQuery = useQuery({
        queryKey: ['issue', issueId],
        queryFn: () => getIssueInfo(issueId),
    });

    const commentsQuery = useQuery({
        queryKey: ['issue', issueId, 'comments'],
        queryFn: () => getIssueComments(issueQuery.data!.number),
        enabled: issueQuery.data !== undefined,
    });

    return {
        issueQuery,
        commentsQuery
    };
};