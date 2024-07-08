import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="fixed bg-[#14171a] py-4 top-0 z-50 w-full shadow-lg flex justify-between px-10">
      <Link to="/">
        <header className="flex items-center justify-center gap-5">
          <img className="h-12" src="vote-icon.png" alt="twitter-logo" />
          <h3 className="text-2xl font-bold text-white">Voting App</h3>
        </header>
      </Link>

      <div>
        <nav className="flex items-center justify-center gap-5 mt-4">
          <Link to="/profile" className="text-white font-semibold hover:text-sky-500 active:text-sky-400">Profile</Link>
          <Link to="/user-campaigns" className="text-white font-semibold hover:text-sky-500 active:text-sky-400">My Campaigns</Link>
          <Link to="/create-campaign" className="text-white font-semibold hover:text-sky-500 active:text-sky-400">Create Campaign</Link>
        </nav>
      </div>
    </div>
  )
}

export default NavBar;