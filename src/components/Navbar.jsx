import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='header'>
      <div className='header-content'>
        <NavLink to='/' className="logo-container">
          <span className="logo-text">JG</span>
        </NavLink>
        <nav className='flex text-base sm:text-lg gap-4 sm:gap-7 font-medium'>
          <NavLink to='/' className={({ isActive }) => isActive ? "text-purple-600 font-semibold" : "text-gray-700 hover:text-purple-600 transition-colors" }>
            About
          </NavLink>
          <NavLink to='/projects' className={({ isActive }) => isActive ? "text-purple-600 font-semibold" : "text-gray-700 hover:text-purple-600 transition-colors"}>
            Projects
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
