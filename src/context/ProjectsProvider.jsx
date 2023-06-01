import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom"
import axiosClient from "../config/axiosClient";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";

let socket;

const ProjectsContext = createContext()

const ProjectsProvider = ({children}) => {
    const [projects, setProjects] = useState([])
    const [alert, setAlert] = useState({})
    const [project, setProject] = useState({})
    const [loading, setLoading] = useState(false)
    const [modalForm, setModalForm] = useState(false)
    const [task, setTask] = useState({})
    const [deleteTaskModal, setDeleteTaskModal] = useState(false)
    const [collaborator, setCollaborator] = useState({})
    const [deleteCollaboratorModal, setDeleteCollaboratorModal] = useState(false)
    const [searcher, setSearcher] = useState(false)

    const navigate = useNavigate()

    const { auth } = useAuth()

    const showAlert = alert => {
        setAlert(alert)

        setTimeout(() => {
            setAlert({})
        }, 3500)
    }

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem('token')

                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient('/projects', config)
                await setProjects(data)
            } catch (error) {
                console.log(error)
            }
        }
        getProjects()
    }, [auth])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

    const submitProject = async project => {
        if (project.id) {
            await updateProject(project)
        } else {
            await createProject(project)
        }
    }

    const createProject = async project => {
        const token = localStorage.getItem('token')

        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post('/projects', project, config)

            setProjects([...projects, data])

            showAlert({
                msg: "Project created correctly",
                error: false
            })

            navigate("/projects")
        } catch (error) {
            console.log(error)
        }
    }

    const updateProject = async project => {
        const token = localStorage.getItem('token')

        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.put(`/projects/${project.id}`, project, config)

            // Sync state
            const projectsUpdated = projects.map(project => (project._id === data._id ? data : project))
            setProjects(projectsUpdated)

            setAlert({
                msg: "Project updated correctly",
                error: false
            })

            setTimeout(() => {
                setAlert({})
    
                navigate("/projects")
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    const getProject = async id => {
        setLoading(true)
        const token = localStorage.getItem('token')

        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient(`/projects/${id}`, config)
            setProject(data)
            setAlert({})
        } catch (error) {
            navigate('/projects')
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 3000)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 1500);
        }
    }

    const deleteProject = async id => {
        const token = localStorage.getItem('token')

        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.delete(`/projects/${id}`, config)

            // Sync state
            const newProjectsList = projects.filter(project => (project._id !== id))
            setProjects(newProjectsList)

            setAlert({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlert({})
    
                navigate("/projects")
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalForm = () => {
        setModalForm(!modalForm)
        setTask({})
    }

    const submitTask = async task => {
        if (task?.id) {
            await editTask(task)
        } else {
            await createTask(task)
        }
    }

    const createTask = async task => {
        const token = localStorage.getItem('token')

        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post('/tasks', task, config)
            
            setAlert({})
            setModalForm(false)

            // Socket IO
            socket.emit('new_task', data)
        } catch (error) {
            console.log(error)
        }
    }

    const editTask = async task => {
        const token = localStorage.getItem('token')

        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config)
            
            setAlert({})
            setModalForm(false)

            // Socket
            socket.emit('update_task', data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalEditTask = task => {
        setTask(task)
        setModalForm(true)
    }

    const handleDeleteModalTask = task => {
        setTask(task)
        setDeleteTaskModal(!deleteTaskModal)
    }

    const deleteTask = async () => {
        const token = localStorage.getItem('token')

        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const { data } =  await axiosClient.delete(`/tasks/${task._id}`, config)
            setAlert({
                msg: data.msg,
                error: false
            })

            setDeleteTaskModal(false)

            // Socket
            socket.emit('delete_task', task)

            setTask({})
            setTimeout(() => {
                setAlert({})
            }, 3000)
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const submitCollaborator = async email => {
        setLoading(true)
        const token = localStorage.getItem('token')

        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post('/projects/collaborators', { email }, config)

            setCollaborator(data)
            setAlert({})
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setLoading(false)
        }
    }

    const addCollaborator = async email => {
        const token = localStorage.getItem('token')

        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post(`/projects/collaborators/${project._id}`, email, config)

            setAlert({
                msg: data.msg,
                error: false
            })

            setCollaborator({})
            setTimeout(() => {
                setAlert({})
            }, 3000)
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleDeleteCollaboratorModal = (collaborator) => {
        setDeleteCollaboratorModal(!deleteCollaboratorModal)
        setCollaborator(collaborator)
    }

    const deleteCollaborator = async () => {
        const token = localStorage.getItem('token')

        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post(`/projects/delete-collaborator/${project._id}`, { id: collaborator._id }, config)

            const projectUpdated = {...project}

            projectUpdated.collaborator = projectUpdated.collaborator.filter(collaboratorState => collaboratorState._id !== collaborator._id)

            setProject(projectUpdated)

            setAlert({
                msg: data.msg,
                error: false
            })
            setCollaborator({})
            setDeleteCollaboratorModal(false)
            setTimeout(() => {
                setAlert({})
            }, 3000)
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleTaskStateShift = async id => {
        const token = localStorage.getItem('token')

        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post(`/tasks/state/${id}`, {}, config)

            setTask({})
            setAlert({})

            // Socket
            socket.emit('change_state', data);
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleSearcher = () => {
        setSearcher(!searcher)
    }

    // Socket io
    const submitProjectTasks = task => {
        // Added task to state
        const projectUpdated = {...project}
        projectUpdated.tasks = [...projectUpdated.tasks, task]
        setProject(projectUpdated)
    }

    const deleteProjectTask = async task => {
        const token = localStorage.getItem('token')

        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        const projectUpdated = {...project}
        projectUpdated.tasks = projectUpdated.tasks.filter(taskState => taskState._id !== task._id)
        await axiosClient.put(`/projects/${projectUpdated._id}`, projectUpdated, config)
        
        setProject(projectUpdated)
    }

    const updateProjectTask = task => {
        const projectUpdated = {...project}
        projectUpdated.tasks = projectUpdated.tasks.map(taskState => taskState._id === task._id ? task : taskState)
        setProject(projectUpdated)
    }

    const changeTaskState = task => {
        const updatedProject = {...project}
        updatedProject.tasks = updatedProject.tasks.map(taskState => taskState._id === task._id ? task : taskState)
        setProject(updatedProject)
    }

    const handleSignOut = () => {
        setAlert({})
        setProjects([])
        setProject({})
    }

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                setAlert,
                alert,
                showAlert,
                submitProject,
                getProject,
                project,
                loading,
                deleteProject,
                handleModalForm,
                modalForm,
                submitTask,
                handleModalEditTask,
                task,
                deleteTaskModal,
                setDeleteTaskModal,
                handleDeleteModalTask,
                deleteTask,
                submitCollaborator,
                collaborator,
                addCollaborator,
                handleDeleteCollaboratorModal,
                deleteCollaboratorModal,
                deleteCollaborator,
                handleTaskStateShift,
                searcher,
                handleSearcher,
                submitProjectTasks,
                deleteProjectTask,
                updateProjectTask,
                changeTaskState,
                handleSignOut
            }}
        >{children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext