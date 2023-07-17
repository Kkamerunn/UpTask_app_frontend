import useProject from "./useProject"
import { useSelector } from "react-redux"

const useAdmin = () => {
    const { project } = useProject()
    const auth = useSelector(state => state.authentication.auth)

    return project.creator === auth._id
}

export default useAdmin