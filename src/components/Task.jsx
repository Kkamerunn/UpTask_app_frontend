import { formatDate } from "../helpers/formatDate"
import useProject from "../hooks/useProject"
import useAdmin from "../hooks/useAdmin"

const Task = ({task}) => {
    const { description, name, priority, deliveryDate, state, _id } = task
    const { handleModalEditTask, handleDeleteModalTask, handleTaskStateShift } = useProject()

    const admin = useAdmin()

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <p className="mb-2 text-xl">{name}</p>
                <p className="mb-2 text-sm text-gray-500 uppercase">{description}</p>
                <p className="mb-2 text-sm">{formatDate(deliveryDate)}</p>
                <p className="mb-2 text-gray-600">{priority}</p>
                {state && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
                    Completed by: {task.completed.name}    
                </p>}
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
                {admin && (
                    <button
                        type="button"
                        className="bg-sky-500 px-4 py-3 text-white uppercase
                        font-bold text-sm rounded-lg"
                        onClick={() => handleModalEditTask(task)}
                    >Edit</button>
                )}
                <button
                    className={`${state ? 'bg-sky-600' : 'bg-gray-600' } px-4 py-3 text-white uppercase
                    font-bold text-sm rounded-lg transition-all ease-in-out`}
                    onClick={() => handleTaskStateShift(_id)}
                >{state ? 'complete' : 'incomplete'}</button>
                {admin && (
                    <button
                        type="button"
                        onClick={() => handleDeleteModalTask(task)}
                        className="bg-red-600 px-4 py-3 text-white uppercase
                        font-bold text-sm rounded-lg"
                    >Delete</button>
                )}
            </div>
        </div>
    )
}

export default Task