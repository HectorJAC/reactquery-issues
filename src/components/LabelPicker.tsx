import { FC } from "react";
import { useGetLabels } from "../hooks/useGetLabels";
import { LoadingIcon } from "./LoadingIcon";

interface Props {
    selectedLabels: string[];
    onchange: (labelName: string) => void;
}

export const LabelPicker:FC<Props> = ({selectedLabels, onchange}) => {
    
    const labelsQuery = useGetLabels();

    if (labelsQuery.isLoading) {
        return <LoadingIcon />
    }

    return (
        <div>
            {
                labelsQuery.data?.map((label) => (
                    <span
                        key={label.id}
                        className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : ''}`}
                        style={{border: `1px solid #${label.color}`, color: `#${label.color}`}}
                        onClick={() => onchange(label.name)}
                    >
                        {label.name}
                    </span>
                ))
            }
        </div>
    );
};
