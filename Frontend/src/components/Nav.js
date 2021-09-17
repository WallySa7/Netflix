import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToggleSideMenu, setIsToggleSideMenu] = useState(false);
  window.onscroll = () => {
    {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    }
  };

  const handleSideMenu = () => {
    setIsToggleSideMenu(!isToggleSideMenu);
  };

  const handleOverlay = () => {
    setIsToggleSideMenu(false);
  };

  return (
    <>
      <div
        className={`overlay${isToggleSideMenu ? " toggle" : ""}`}
        onClick={handleOverlay}></div>
      <div
        className={`nav${isScrolled ? " scrolled" : ""} ${
          isToggleSideMenu ? " background" : ""
        }`}>
        <div className='nav-container'>
          <div className='nav-left'>
            <div className='burgermenu' onClick={handleSideMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <a href='#'>
              <img className='logo' src='Netflix_Logo_CMYK.png' alt='netflix' />
            </a>
            <div className='nav-items'>
              <ul>
                <li>Home</li>
                <li>TV Shows</li>
                <li>Movies</li>
                <li>New & Popular</li>
                <li>My List</li>
              </ul>
            </div>
          </div>
          <div className='nav-right'>
            <FaSearch className='search-btn' />
          </div>
        </div>
        <div className={`sidemenu${isToggleSideMenu ? " toggle" : ""}`}>
          <ul>
            <li>
              <a href='#' className='active'>
                Home
              </a>
            </li>
            <li>
              <a href='#'>TV Shows</a>
            </li>
            <li>
              <a href='#'>Movies</a>
            </li>
            <li>
              <a href='#'>New & Popular</a>
            </li>
            <li>
              <a href='#'>My List</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
