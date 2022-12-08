import React from 'react';

export const Dropdown = (props) => {
  let dropdownText = props.category;
  let value = dropdownText.toLowerCase();   
  const listItems = props.list.map((item) => {
    return (
      <option key={item}>{item}</option>
    );
  })

  return (       
    <select className="form-select form-select-lg" onChange={props.onChange} name={props.fieldName} required>
      <option selected disabled value={value}>{dropdownText}</option>
      {listItems}
    </select>
  );
}


export const Field = (props) => {
  return (
    <div className='form-field'>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <p className="form-title">{props.name}</p>
        <p className="form-required">*</p>
      </div>
      {props.children}
      <p className='error-message'>{props.error}</p>
    </div>
  ); 
}