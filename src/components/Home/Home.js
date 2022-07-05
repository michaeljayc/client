import React, { useEffect, useState } from 'react';
import '../Navbar/Navbar.css';
import '../Footer/Footer.css';
import './home.css';
import api from '../../api/transport';
import { toast } from 'react-toastify';
import { formatTime } from '../../common/common';
import Pagination from '../Pagination/Pagination';

const Home = ({ datas, previous, next, pages, handlePageChange, deleteTransport, current }) => {

    return (
        <div className='row home'>
            <div className='row'>
                <a href='/add'>
                    <button className='btn btn-success col-sm-1 add-btn'>
                        <span className='add-text'>Add</span>
                    </button>
                </a>
            </div>
            <div className='row container table-responsive-md'>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Transport</th>
                            <th>Reason</th>
                            <th>Expenses</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    { Object.keys(datas).length === 0 && 
                        <tr>
                            <td colSpan={6} className='text-center'><h4>No data available.</h4></td>
                        </tr>
                    }

                    {   datas && datas.map( (item,index) =>
                            <tr key={index}>
                                <td>{item.transport}</td>
                                <td>{item.reason}</td>
                                <td>&#8369; {item.expenses}</td>    
                                <td>{formatTime(item.time_start)}</td>
                                <td>{formatTime(item.time_end)}</td>
                                <td>
                                    <a href={`edit/${item.id}`} className='btn btn-primary'>Edit</a>&nbsp;
                                    <button className='btn btn-danger' onClick={() => deleteTransport(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }   
                    </tbody>
                </table>
            </div>  
            <Pagination
                numberOfPages={pages}
                handlePageChange={handlePageChange}
                previous={previous}
                next={next}
                current={current}
            />     
        </div>
    )
}

export default Home