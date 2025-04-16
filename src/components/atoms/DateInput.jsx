import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ value, onChange, className = '', ...props }) => {
  return (
    <div className="relative">
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white ${className}`}
        placeholderText="JJ/MM/AAAA"
        showPopperArrow={false}
        calendarStartDay={1}
        {...props}
      />
    </div>
  );
};

export default DateInput;