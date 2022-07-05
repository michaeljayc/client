import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ( { keywords, handleOnChange, handleSearch } ) => {

    let navigate = useNavigate();
    const [selected, setSelected] = useState('/');

    const handlePageNav = (event,menu) => { 
        event.preventDefault();
        setSelected(menu);
        navigate(menu)
    }

    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand logo" href='/'>DailyApp</a>
                    <button className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav">
                            <li className='nav-item'>
                                <a  className={`nav-link ${ selected === '/' ? 'active' : ''} `} 
                                    href="/"
                                    onClick={ e => handlePageNav(e,'/')}
                                    >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${ selected === 'reports' ? 'active' : ''} `} 
                                    href="/reports"
                                    onClick={ e => handlePageNav(e,'reports')}>
                                    Reports
                                </a>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={ handleSearch }>
                            <input className="form-control me-2" type="search" 
                                placeholder="Search" 
                                aria-label="Search" 
                                name='keyword'
                                value={keywords}
                                onChange={handleOnChange}/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar