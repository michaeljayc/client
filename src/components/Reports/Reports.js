import React, { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Bar } from 'react-chartjs-2'
import './reports.css';
import api from '../../api/transport';
import { validateDateRange } from '../../common/common';

const formInitialValues = {
    dateFrom: '',
    dateTo: ''
}



const Reports = () => {

    const [formValues, setFormValues] = useState(formInitialValues);
    const [labels, setLabels] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [errors,setErrors] = useState({})

    useEffect( () => {
        
        // setErrors(validateDateRange(formValues));
        const getReports = async () => {
            let from = formValues.dateFrom+'T00:00';
            let to = formValues.dateTo+'T23:59';
            const response = await api.get(`transport/reports?from=${from}&to=${to}`);
            if (response.status === 200) {
                setLabels(response.data.labels)
                setExpenses(response.data.expenses);
            }
        }
        
        getReports();

    }, [formValues])

    const handleOnChange = (event) => {
        const {name,value} = event.target;
        setFormValues({...formValues, [name]:value})
    }

    // const handleOnClick = (event) => {
    //     setErrors(validateDateRange(formValues));
    //     event.preventDefault();
    //     if (Object.keys(errors).length === 0) {
    //         getReports();
    //     } else {
    //         console.log('error')
    //     }
    // }
    
    return (
        <div className='container'>
            <div className='wrapper'>
                <div className='row range'>
                    <div className='col-md range-opt'>
                        <label>From</label>
                        <input type='date' 
                            name='dateFrom' 
                            value={formValues.dateFrom}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className='col-md range-opt'>
                        <label>To</label>
                        <input type='date' 
                            name='dateTo' 
                            value={formValues.dateTo}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    {/* <div className='col-md range-opt'>
                        <button type='submit' 
                            className='btn btn-primary'
                            onClick={handleOnClick}
                        >
                            Submit
                        </button>
                    </div> */}
                </div>
                <div className='row reports'>
                    { Object.keys(labels).length === 0 && (
                            <h4 className='range-opt'>Please select date range...</h4>
                        )
                    }
                    { Object.keys(labels).length !== 0 &&
                        <Bar
                            datasetIdKey = '1'
                            data = {{
                            labels: labels,
                            datasets: [
                                {
                                    id: 1,
                                    label: 'Expense per day',
                                    data: expenses,
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                },
                            ],
                            }}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Reports;