import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"
import useAuth from "../hooks/useAuth"
import SpinnerSquare from "../components/SpinnerSquare"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { setAuth } = useAuth()

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        if ([email, password].includes('')) {
            setAlert({
                msg: "All fields are required",
                error: true
            })
            return
        }

        try {
            const { data } = await axiosClient.post("/users/login", { email, password })

            setAlert({})

            localStorage.setItem('token', data.token)
            setAuth(data)          
        } catch (error) {
            setLoading(true)
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setTimeout(() => {
                setLoading(false)
                navigate("/projects")
            }, 2500)
        }
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
                onSubmit={handleSubmit}    
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