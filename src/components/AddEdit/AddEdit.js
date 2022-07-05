import React, { useState, useEffect } from "react";
import './add.css';
import { formatTime, validate } from '../../common/common.js';
import api from '../../api/transport';
import { useNavigate, useParams }from 'react-router-dom';
import { toast } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

const initialValues = { 
    transport: "", 
    reason:"", 
    expenses:0, 
    time_start:"", 
    time_end: "" ,
};

const AddEdit = ({ getList }) => {

    const transportation = ['Walk','Bike','Motorcycle','Car'];
    const [formValues, setFormValues] = useState(initialValues);
    const {transport, reason, expenses, time_start, time_end} = formValues;
    const [formErrors, setFormErrors] = useState({});
    const [submitValue, setSubmitValue] = useState('Add');
    const [pageTitle, setPageTitle] = useState('Create New Record');
    const navigate = useNavigate();
    const {id} = useParams();
    injectStyle();
    
    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = (event) => {
        setFormErrors(validate(formValues));
        event.preventDefault();
        if (Object.keys(formErrors).length === 0) {
            if (id) {
                updateTransport(formValues);
            } else {
                addTransport(formValues);
            }

            setTimeout( () => navigate('/'),100);
        }
    };

    const addTransport = async (data) => {
        let response = await api.post('transport/add',data);
        if (response.status === 201) {
            toast.success(response.data);
            getList(1);
        }
    };

    const updateTransport = async data => {
        let response = await api.put(`transport/update/${id}`, data);
        if (response.status === 200) {
            setFormValues(data);
            toast.success(response.data);
        }
    }

    useEffect( () => {
        if (id) {
            api.get(`transport/edit/${id}`)
                .then( res => {
                    if (res.status === 200) {
                        setFormValues(res.data);
                    }
                })
                .catch( err => {
                    console.log(err);
                })
            
            setPageTitle('Update Record');
            setSubmitValue('Update');
        }
    },[id]);

    return (
        <div className="row add">
            <h3 className="title">{pageTitle}</h3>
            <form className="form-floating" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-floating col-md-4 mb-4">
                        <select className="form-select form-control mb-2"
                            name='transport'
                            onChange={handleChange}
                            value={transport} 
                            required
                        >
                            <option default hidden value="">Select . . .</option>
                            {   transportation.map( (name,index) => { 
                                    return <option key={index} value={name}>{name}</option> ;
                                })
                            }
                        </select>
                        <label>Transportation</label>
                    </div>
                </div>
                <div className="row">
                    <div className="form-floating col-md-4 mb-4">
                        <textarea className="form-control mb-2" 
                            onChange = {handleChange}
                            name = 'reason'
                            value = {reason}
                            id='floatingTextarea'
                            required
                        >
                        </textarea>
                        <label>Reason</label>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="form-floating col-md-4">
                        <input type="number" 
                            className="form-control" 
                            onChange={handleChange}
                            name='expenses'
                            value={expenses}
                        />
                        <label>Expenses</label>
                    </div>
                </div>
                <div className="row">
                    <div className="form-floating col-md-4 mb-4">
                        <input type='datetime-local'
                            onChange={handleChange}
                            name='time_start'
                            value={time_start}
                            className='form-control mb-2'
                            required
                        />
                        <label>Start Time</label>
                    </div>
                </div>
                <div className="row"> 
                    <div className="form-floating col-md-4 mb-4">
                        <input type='datetime-local'
                            onChange={handleChange}
                            name='time_end'
                            value={time_end}
                            className='form-control mb-2'
                            required
                        />
                        <label>End Time</label>
                    </div>
                </div>

                <button
                    className="btn btn-primary col-md-1"
                    type="submit"
                >
                    {submitValue}
                </button>
            </form>
        </div>
    )
}

export default AddEdit