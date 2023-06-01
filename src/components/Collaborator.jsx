import useProject from "../hooks/useProject"
import useAdmin from "../hooks/useAdmin"

const Collaborator = ({ collaborator }) => {
    const { handleDeleteCollaboratorModal } = useProject()

    const { name, email } = collaborator

    const admin = useAdmin()
    
    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p>{name}</p>
                <p className="text-sm text-gray-700">{email}</p>
            </div>
            {admin && (
                <div>
                    <button
                        type="button"
                        className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleDeleteCollaboratorModal(collaborator)}
                    >Delete</button>
                </div>
            )}
        </div>
    )
}

export default Collaborator