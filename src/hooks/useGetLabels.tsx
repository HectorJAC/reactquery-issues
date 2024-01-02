import { useQuery } from '@tanstack/react-query';
import { Label } from '../interfaces/labels';
import { githubApi } from '../api/githubApi';

export const getLabels = async ():Promise<Label[]> => {
    const { data } = await githubApi.get<Label[]>('/labels?per_page=100');
    return data;
}

export const useGetLabels = () => {
    
    const labelsQuery = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
        placeholderData: [
            {
                id: 725156255,
                node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
                url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
                name: "good first issue (taken)",
                color: ",b60205",
                default: false
            },
            {
                id: 717031390,
                node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
                url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
                name: "good first issue",
                color: "6ce26a",
                default: true
            }
        ],
    });

    return labelsQuery;
};
