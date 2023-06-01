import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useProject from "../hooks/useProject"
import useAdmin from "../hooks/useAdmin"
import Spinner from "../components/Spinner"
import TaskModalForm from "../components/TaskModalForm"
import Task from "../components/Task"
import DeleteTaskModal from "../components/DeleteTaskModal"
import DeleteCollaboratorModal from "../components/DeleteCollaboratorModal"
import Alert from "../components/Alert"
import Collaborator from "../components/Collaborator"
import io from "socket.io-client"

let socket;

const Project = () => {
  const params = useParams()

  const { 
    getProject, 
    project, 
    loading, 
    handleModalForm, 
    alert, 
    submitProjectTasks,
    deleteProjectTask,
    updateProjectTask,
    changeTaskState
  } = useProject()

  const admin = useAdmin()

  useEffect(() => {
    getProject(params.id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('open_project', params.id)
  }, [])

  useEffect(() => {
    socket.on('task_added', newTask => {
      if (newTask.project === project._id) {
        submitProjectTasks(newTask)
      }
    })

    socket.on('task_deleted', deletedTask => {
      if (deletedTask.project === project._id) {
        deleteProjectTask(deletedTask)
      }
    })

    socket.on('task_updated', taskUpdated => {
      if (taskUpdated.project._id === project._id) {
        updateProjectTask(taskUpdated)
      }
    });

    socket.on('state_changed', newTaskState => {
      if (newTaskState.project._id === project._id) {
        changeTaskState(newTaskState)
      }
    });
  })

  const { name } = project

  const { msg } = alert

  return (
    loading ? 
      <Spinner /> : (
          <>
            <div className="flex justify-between">
              <h1 className="font-black text-4xl">{name}</h1>
              {admin && (
                <div className="flex items-center gap-2 text-gray-400 hover:text-black cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                  <Link
                    to={`/projects/edit/${params.id}`}
                    className="text-gray-400 hover:text-black uppercase font-bold"
                  >Edit</Link>
                </div>
              )}
            </div>
            {admin && (
              <button
                type="button"
                className="mt-5 text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center flex gap-2 items-center justify-center"
                onClick={handleModalForm}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                New task
              </button>
            )}
            <p className="font-bold text-xl mt-10">Project's tasks</p>
            <div className="flex justify-center">
              <div className="w-full md:w-1/3">
                {msg && <Alert alert={alert} />}
              </div>
            </div>
            <div className="bg-white shadow mt-10 rounded-lg">
              {project.tasks?.length ? 
                project.tasks?.map(task => (
                  <Task 
                    key={task._id}
                    task={task}
                  />
                )) :
                <p className="text-center my-5 p-10">There are no tasks in this project</p>
              }
            </div>
            <div className="flex items-center justify-between mt-10">
              <p className="font-bold text-xl">Collaborators</p>
              {admin && (
                <Link
                  to={`/projects/new-collaborator/${project._id}`}
                  className="text-gray-400 hover:text-black uppercase font-bold"
                >Add</Link>
              )}
            </div>
            <div className="bg-white shadow mt-10 rounded-lg">
              {project.collaborators?.length ? 
                project.collaborators?.map(collaborator => (
                  <Collaborator
                    key={collaborator._id}
                    collaborator={collaborator}
                  />
                )) :
                <p className="text-center my-5 p-10">There are no collaborators in this project</p>
              }
            </div>
            <DeleteCollaboratorModal />
            <TaskModalForm />
            <DeleteTaskModal />
          </>
      )
  )
}

export default Project