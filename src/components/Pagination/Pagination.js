import React from 'react';

const Pagination = ({ numberOfPages, handlePageChange, previous, next, current }) => {

    const pageNumbers = [];

    for (let i = 1; i <= numberOfPages ; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='row'>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={ `page-item ${previous === 0 ? 'disabled' : ''} 
                        ${pageNumbers < 2 ? 'invisible' : ''} `}
                    >
                        <a className="page-link" href='?page=previous' onClick={ e => handlePageChange(e,previous)}>Previous</a>
                    </li>
                    { pageNumbers.map( number => (
                        <li key={number} 
                            className={ `page-item ${pageNumbers < 2 ? 'invisible' : ''} 
                                ${current === number ? 'active' : ''} `}
                        >
                            <a onClick={ e => handlePageChange(e, number)} className="page-link" href={`?page=${number}`}>{number}</a>
                        </li>
                        ))
                    }
                    <li className={`page-item ${next === 0 ? 'disabled' : ''} 
                        ${pageNumbers < 2 ? 'invisible' : ''} `}
                    >
                        <a onClick={ e => handlePageChange(e,next)} 
                        className="page-link" 
                        href='?page=next'
                        >
                            Next
                        </a>
                    </li>
                </ul>  
                    
            </nav>
        </div>
    );
};

export default Pagination;