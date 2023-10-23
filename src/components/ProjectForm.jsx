import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProject from "../hooks/useProject";
import Alert from "./Alert";

const ProjectForm = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [customer, setCustomer] = useState("");

  const params = useParams();

  const { alert, showAlert, submitProject, project } = useProject();

  useEffect(() => {
    if (params.id && project) {
      setId(project._id);
      setName(project.name);
      setDescription(project.description);
      setDeliveryDate(project.deliveryDate.split("T")[0]);
      setCustomer(project.customer);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, deliveryDate, customer].includes("")) {
      showAlert({
        msg: "All fields are required",
        error: true,
      });
      return;
    }

    await submitProject({
      id,
      name,
      description,
      deliveryDate,
      customer,
    });

    setId(null);
    setName("");
    setDescription("");
    setDeliveryDate("");
    setCustomer("");
  };

  const { msg } = alert;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow mx-auto"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Project's name
        </label>
        <input
          id="name"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Name of the project"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Project's description
        </label>
        <textarea
          id="description"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Description of the project"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-5">
        <label
          htmlFor="delivery-date"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Project's delivery date
        </label>
        <input
          id="delivery-date"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          min={new Date().toISOString().split("T")[0]}
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="customer"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Project's customer
        </label>
        <input
          id="customer"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Customer of the project"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value={id ? "update project" : "create project"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer
                hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default ProjectForm;
