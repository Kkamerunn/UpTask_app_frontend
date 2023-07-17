import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Alert from "../components/Alert"
import SpinnerSquare from "../components/SpinnerSquare"
import { useDispatch, useSelector } from "react-redux"
import { authenticateUser } from "../actions/authActions"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})

    const dispatch = useDispatch()

    const addUser = user => dispatch(authenticateUser(user))

    const loading = useSelector(state => state.authentication.loading)
    const error = useSelector(state => state.authentication.error)

    const navigate = useNavigate()

    const handleSubmitRedux = e => {
        e.preventDefault()

        if ([email, password].includes('')) {
            setAlert({
                msg: "All fields are required",
                error: true
            })
            return
        }

        addUser({email, password})

        navigate("/projects")
    }

    const { msg } = alert

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">
                Log in and manage your {' '}
                <span className="text-slate-700">projects</span>
            </h1>
            {msg && <Alert alert={alert} />}
            {loading && <SpinnerSquare />}
            <form 
                className="my-10 bg-white shadow rounded-lg px-6 py-3"
                onSubmit={handleSubmitRedux}    
            >
                <div className="my-4">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"    
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-4">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password"    
                    >Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <input 
                    type="submit"
                    value='log in'
                    className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer
                    hover:bg-sky-800 transition-colors mb-4"
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/register"
                >Don't you have an account yet? Sign up</Link>
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/forgot-password"
                >Forgot your password?</Link>
            </nav>
        </>
    )
}

export default Login