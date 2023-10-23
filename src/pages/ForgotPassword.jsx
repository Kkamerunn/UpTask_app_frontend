import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlert({
        msg: "The email is mandatory",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post(`/users/forgot_password`, {
        email,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Reset your password and manage
        <br /> your <span className="text-slate-700">projects</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        className="mt-7 bg-white shadow rounded-lg px-6 py-3"
        onSubmit={handleSubmit}
      >
        <div className="my-4">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Reset password"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer
                    hover:bg-sky-800 transition-colors mb-4"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Already have an account? Log in
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/register"
        >
          Don't have an account yet? Sign up
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
