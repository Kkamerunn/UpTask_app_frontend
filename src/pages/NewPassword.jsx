import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});

  const navigate = useNavigate();

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        // TODO: Move towars an axios client
        await axiosClient(`/users/forgot_password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    checkToken();
  }, []);

  const { msg } = alert;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "Password must be at least of 6 characters",
        error: true,
      });
      return;
    }

    try {
      const url = `/users/forgot_password/${token}`;

      const { data } = await axiosClient.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Set a new password and manage
        <br /> your <span className="text-slate-700">projects</span>
      </h1>
      {msg && <Alert alert={alert} />}
      {validToken && (
        <form
          className="mt-7 bg-white shadow rounded-lg px-6 py-3"
          onSubmit={handleSubmit}
        >
          <div className="my-4">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              New password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Reset password"
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer
                        hover:bg-sky-800 transition-colors mb-4"
          />
        </form>
      )}
    </>
  );
};

export default NewPassword;
