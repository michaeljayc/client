import { createContext } from 'react';

export const validate = (values) => {
    const errors = {};
    if (!values.transport ) {
        errors.transport = "Transpo is required.";
    }
    if (!values.reason) {
        errors.reason = "Reason is required.";
    }
    if (!values.time_start) {
        errors.time_start = "StartTime is required.";
    }
    if (!values.time_end) {
        errors.time_end = "EndTime is required.";
    }

    return errors;
};

export const validateDateRange = (values) => {
    const errors = {};
    
    if (!values.dateFrom) {
        errors.dateFrom = "Date From is required";
    }
    if (!values.dateTo) {
        errors.dateTo = "Date To is required";
    }

    return errors;
}

export const formatTime = (time) => {
    const date = time.split('T')[0];
    const timeToArray = (time.split('T')[1]).split(':');
    const timeString = timeToArray[0]+':'+timeToArray[1];
    const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
    .toLocaleTimeString('en-PH',
        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
    );

    return date+' '+timeString12hr;
}

export const ListContext = createContext(null);