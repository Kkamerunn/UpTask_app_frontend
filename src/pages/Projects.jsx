import useProject from "../hooks/useProject";
import PreviewProject from "../components/PreviewProject";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const Projects = () => {
    const { projects, alert, loading} = useProject()
 
    const { msg } = alert

    return (
        loading ? <Spinner /> : (
            <>
                <h1 className="text-4xl font-black">Projects</h1>

                {msg && <Alert alert={alert} />}

                <div className="bg-white shadow mt-10 rounded-lg p-5">
                    {projects.length > 0 ? 
                        projects.map(project => (
                            <PreviewProject key={project._id} project={project} />
                        )) : <p className="text-center text-gray-600 uppercase p-5">There are no projects</p>}
                </div>
            </>
        )
    )
}

export default Projects;