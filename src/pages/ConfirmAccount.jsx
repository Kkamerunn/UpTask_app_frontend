import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({})
  const [accountConfirmed, setAccountConfirmed] = useState(false)

  const params = useParams()

  const { id } = params

  useEffect(() => {
    console.log('render')
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`
        const { data } = await axiosClient(url)

        setAlert({
          msg: data.msg,
          error: false
        })
        setAccountConfirmed(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmAccount()
  }, [])

  const { msg } = alert

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
          Confirm your account and manage your {' '}
          <span className="text-slate-700">projects</span>
      </h1>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {accountConfirmed && (
            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/"
            >Log in</Link>
            )}
      </div>
    </>
  )
}

export default ConfirmAccount