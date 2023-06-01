import { useContext } from "react";
import ProjectsContext from "../context/ProjectsProvider";

const useProject = () => {
    return useContext(ProjectsContext)
}

export default useProject