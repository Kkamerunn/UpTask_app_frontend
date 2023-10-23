import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProject from "../hooks/useProject";
import Search from "./Search";

const Header = () => {
  const { handleSetAuth } = useAuth();
  const { handleSearcher, handleSignOut } = useProject();

  const signOut = () => {
    handleSetAuth();
    handleSignOut();
    localStorage.removeItem("token");
  };

  return (
    <header className="px-4 py-5 bg-white border-b fixed top-0 left-0 right-0">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          UpTask
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className="font-bold uppercase"
            onClick={handleSearcher}
          >
            Find a project
          </button>
          <Link to="/projects" className="font-bold uppercase">
            Projects
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
          >
            Sign out
          </button>
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
