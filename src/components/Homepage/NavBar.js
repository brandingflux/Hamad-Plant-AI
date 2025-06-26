import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import LearnMoreModal from "../Popup/LearnMoreModal";

const NavBar = ({onTryNowClick}) => {
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      if (window.innerWidth > 600) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);

    // Close menu on scroll (mobile only)
    const handleScroll = () => {
      if (window.innerWidth <= 600 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  // Close menu on nav click (mobile)
  const handleNavClick = (cb) => {
    setMenuOpen(false);
    if (cb) cb();
  };

  return (
    <>
      <div className="navbar" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        <h3 className="logo" style={{ margin: 0, flexShrink: 0 }}><span role="img" aria-label="leaf">🌿</span> VerdLeaf</h3>
        {isMobile && (
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="navbar-menu"
            style={{ marginLeft: 'auto' }}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        )}
        {!isMobile && (
          <nav className="navbar-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', margin: 0 }}>
            <Link to="instructions" smooth={true} duration={500} className="navbar-link" style={{ margin: 0 }} onClick={() => handleNavClick()}>
              How it Works
            </Link>
            <span className="navbar-link" style={{ cursor: 'pointer', margin: 0 }} onClick={() => { setShowLearnMore(true); }}>
              Learn More
            </span>
            <button className="cta navbar-cta" style={{ margin: 0, display: 'flex', alignItems: 'center' }} onClick={() => { handleNavClick(onTryNowClick); }}>
              <span role="img" aria-label="cloud-upload"></span>Go
            </button>
          </nav>
        )}
        {showLearnMore && <LearnMoreModal onClose={() => setShowLearnMore(false)} />}
      </div>
      {isMobile && menuOpen && (
        <>
          <div
            className={`navbar-overlay open`}
            style={{ zIndex: 2000 }}
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id="navbar-menu"
            className={`navbar-menu open`}
            style={{ zIndex: 2000, position: 'absolute', top: '4.5rem', left: 0, width: '100vw' }}
          >
            <Link to="instructions" smooth={true} duration={500} className="navbar-link" onClick={() => handleNavClick()}>
              How it Works
            </Link>
            <span className="navbar-link" style={{cursor: 'pointer'}} onClick={() => { setShowLearnMore(true); setMenuOpen(false); }}>
              Learn More
            </span>
            <button className="cta navbar-cta" onClick={() => { handleNavClick(onTryNowClick); }}>
              <span role="img" aria-label="cloud-upload"></span>Go
            </button>
          </nav>
        </>
      )}
    </>
  );
};

export default NavBar;
