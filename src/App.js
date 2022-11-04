import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { formFields, formFieldValidations } from './utils'
import { Dropdown, Field } from './Components'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occupations: [],
      states: [],
      isSubmitted: false,
      isLoading: false,
      errors: {},
    }  
  }

  componentDidMount() {
    fetch("https://frontend-take-home.fetchrewards.com/form")
      .then((response => response.json()))
      .then(this.handleGetSuccess, this.handleError);
  }

  resetForm = (event) => {
    event.preventDefault();

    this.setState({
      isSubmitted: false
    });
  }

  postUserData = (data) => {
    fetch("https://frontend-take-home.fetchrewards.com/form", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(this.handlePostSuccess, this.handleError)
  }

  handlePostSuccess = () => {
    this.setState({
      isSubmitted: true,
      errors: {},
      isLoading: false,
    });
  }

  formHasError = (fields) => {
    let hasError = false;
    const errorData = {};

    fields.forEach((field) => {
      const name = field.name;
      const error = formFieldValidations[name](field);
      if (error) {
        errorData[name] = formFieldValidations[name](field);
      }
    });

    if (Object.keys(errorData).length) {
      this.setState({
        errors: errorData,
      })

      hasError = true;
    }

    return hasError;
  }

  handleFormSubmission = (event) => {
    event.preventDefault(); 
    const userData = {};

    // Exclude submit button.
    const fields = Array.from(event.currentTarget).filter((input) => input.type !== 'submit');
    
    // If there are no errors, submit the form.
    if (!(this.formHasError(fields))) {
      this.setState({
        isLoading: true,
      });

      fields.forEach((field) => {
        userData[field.name] = field.value; 
      })

      this.postUserData(userData);
    }     
  }

  handleGetSuccess = (response) => {
    this.setState({
      occupations: response.occupations,
      states: this.formatStates(response.states),
    });
  }

  formatStates = (states) => {
    return states.map((state) => {
      return state.name + ', ' + state.abbreviation;
    });
  }

  handleError = () => {
    console.error('Something went wrong!');
    this.setState({
      isLoading: false,
    });
  }

  render() {
    // Wait for the occupations and states to load before rendering the form.
    if (!this.state.occupations.length || !this.state.states.length) {
      return (
        <div 
          style={{marginLeft: 10}} 
          className="spinner-border text-dark" 
          role="status">
          <span class="sr-only">Loading...</span>            
        </div>
      );
    }

    if (this.state.isSubmitted) {
      return (
        <div>
          <h1>Thanks for your submission!</h1>
          <button className='btn btn-primary btn-lg' onClick={this.resetForm}>Create another account!</button>
        </div>   
      );
    }

    return(
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className="form-container">
          <h1>User creation form</h1>
          <form onSubmit={this.handleFormSubmission}>            
            <Field 
              name="Full Name"
              error={this.state.errors.name}>
                <input 
                  className="form-control" 
                  name={formFields.name} 
                  placeholder='Enter full name...'
                />
            </Field>      
            <Field 
              name="Email"
              error={this.state.errors.email}>
                <input 
                  className="form-control"                 
                  name={formFields.email} 
                  placeholder='example@email.com'
                />
            </Field>           
            <Field 
              name="Password"
              error={this.state.errors.password}>
                <input 
                  className="form-control" 
                  type="password" name={formFields.password} 
                  placeholder='Enter password...'
                />
            </Field>        
            <Field 
              name="Occupation"
              error={this.state.errors.occupation}>
              <Dropdown
                list={this.state.occupations} 
                category='Occupation' 
                fieldName={formFields.occupation} 
              /> 
            </Field>
            <Field 
              name="State"              
              error={this.state.errors.state}>
              <Dropdown 
                list={this.state.states} 
                category='State' 
                fieldName={formFields.state} 
              />
            </Field> 
            <div className="submit-container">
            <button className='btn btn-primary btn-lg submit-button' type='Submit'>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{fontWeight: 700, fontSize: 15}}>Submit</div>
                {this.state.isLoading && 
                  <div 
                    style={{marginLeft: 10}} 
                    className="spinner-border text-light" 
                    role="status">
                  <span className="sr-only">Loading...</span>            
                </div>}
              </div>
            </button>  
            </div>                                    
          </form>
        </div>  
      </div>
    ); 
  }
}

export default App;
