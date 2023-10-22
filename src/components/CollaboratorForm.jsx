import { useState } from "react";
import useProject from "../hooks/useProject";
import Alert from "./Alert";

const CollaboratorForm = () => {
  const [email, setEmail] = useState("");

  const { setAlert, submitCollaborator, alert } = useProject();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      setAlert({
        msg: "The email is mandatory",
        error: true,
      });
      return;
    }

    submitCollaborator(email);
  };

  const { msg } = alert;

  return (
    <form
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email of the user"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value={"find collaborator"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer
                hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default CollaboratorForm;
