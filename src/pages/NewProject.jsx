import ProjectForm from "../components/ProjectForm";

const NewProject = () => {
    return (
        <>
            <h1 className="text-4xl font-black">New Project</h1>
            <div className="mt-5">
                <ProjectForm />
            </div>
        </>
    )
}

export default NewProject;