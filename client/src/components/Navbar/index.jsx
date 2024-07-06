import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="fixed bg-[#14171a] py-4 top-0 z-50 w-full shadow-lg">
      <Link to="/">
        <header className="flex items-center justify-center gap-5">
          <img className="h-12" src="vote-icon.png" alt="twitter-logo" />
          <h3 className="text-2xl font-bold text-white">Voting App</h3>
        </header>
      </Link>
    </div>
  )
}

export default NavBar;