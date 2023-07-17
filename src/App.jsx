import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import ProtectedRoute from './layouts/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import Projects from './pages/Projects'
import NewProject from './pages/NewProject'
import Project from './pages/Project'
import EditProject from './pages/EditProject'
import NewCollaborator from './pages/NewCollaborator'
import { ProjectsProvider } from './context/ProjectsProvider'
import './App.css'
import { Provider } from "react-redux"
import store from './store'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>
            <Route path="/projects" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<NewProject />} />
              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditProject />} />
              <Route path="new-collaborator/:id" element={<NewCollaborator />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
