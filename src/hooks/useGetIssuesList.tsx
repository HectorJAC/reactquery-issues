import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Issue, State } from "../interfaces/issue";
import { githubApi } from "../api/githubApi";

interface Props {
    state?: State;
    labels: string[];
    page?: number;
}

export const getIssues = async ({labels, state, page = 1}:Props):Promise<Issue[]> => {
    const params = new URLSearchParams();

    if (state) {
        params.append('state', state);
    }

    if (labels.length > 0) {
        const labelString = labels.join(',');
        params.append('labels', labelString);
    }

    params.append('page', page.toString());
    params.append('per_page', '5');

    const { data } = await githubApi.get<Issue[]>('/issues', {params});
    return data;
};

export const useGetIssuesList = ({state, labels}: Props) => {
    
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [state, labels])

    const issueQuery = useQuery({
        queryKey: ['issues', {state, labels, page}],
        queryFn: () => getIssues({labels, state, page}),
    });

    const nextPage = () => {
        if (issueQuery.data?.length === 0) {
            return;
        }

        setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const homePage = () => {
        setPage(1);
    }

    return {
        // Properties
        issueQuery,

        // Getter
        page: issueQuery.isFetching ? 'Loading' : page,

        // Methods
        nextPage,
        prevPage,
        homePage
    };
};
