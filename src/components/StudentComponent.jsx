import React, { useEffect } from 'react'
import { useState } from 'react'
import { addStudent, getStudent, updateStudent } from '../services/StudentService'
import { useNavigate, useParams } from 'react-router-dom'

const StudentComponent = () => {

    const[fullname,setFullname]=useState('')
    const[city,setCity]=useState('')
    const[phonenumber,setPhonenumber]=useState('')
    const[email,setEmail]=useState('')

    const{id} = useParams();
    const [errors, setErrors] = useState({
        fullname:'',
        city:'',
        phonenumber:'',
        email:'',
    })

    const navigator = useNavigate();

    useEffect(()=>{
        if(id){
            getStudent(id).then((response)=>{
                setFullname(response.data.fullname);
                setCity(response.data.city);
                setPhonenumber(response.data.phonenumber);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    }
    ,[id])

    function handleName(e){
        setFullname(e.target.value);
    }


    function handleCity(e){
        setCity(e.target.value);
    }
    
    function handlePhonenumber(e){
        setPhonenumber(e.target.value);
    }
    
    function handleEmail(e){
        setEmail(e.target.value);
    }

    function saveOrUpdateStudent(e){
        e.preventDefault();

        if(validateForm()){
            const student = { fullname, city, phonenumber, email };
            console.log(student);
            if(id){
                updateStudent(id, student).then((response)=>{
                    console.log(response.data);
                    navigator('/student');
                }).catch(error =>{
                    console.error(error);
                })
            }else{
                addStudent(student).then((response) => {
                    console.log(response.data);
                    navigator('/student')
                }).catch(error =>{
                    console.error(error);
                })
            }
        
        }
        
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = {...errors};
    
        if(fullname.trim()){
            errorsCopy.fullname='';
        } else {
            errorsCopy.fullname = 'Full Name is required';
            valid = false;
        }
    
        if(city.trim()){
            errorsCopy.city='';
        } else {
            errorsCopy.city = 'City is required';
            valid = false;
        }
    
        if(phonenumber.trim()){
            if (/^\d{10}$/.test(phonenumber.trim())) {
                errorsCopy.phonenumber='';
            } else {
                errorsCopy.phonenumber = 'Phone number must be a 10-digit number';
                valid = false;
            }
        } else {
            errorsCopy.phonenumber = 'Phone number is required';
            valid = false;
        }
    
        if(email.trim()){
            if (/^\S+@\S+\.\S+$/.test(email.trim())) {
                errorsCopy.email='';
            } else {
                errorsCopy.email = 'Invalid email format';
                valid = false;
            }
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }
    
        setErrors(errorsCopy);
        return valid;
    }
    

    function pageTitle(){
        if(id){
            return<h2 className='text-center'>Update Student</h2>
        }else {
            return<h2 className='text-center'>Add Student</h2>
        }
    }

  return (
    <div className='container'>
        <br></br>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Full Name:</label>
                            <input
                                type='text'
                                placeholder='Enter fullname'
                                name='fullname'
                                value={fullname}
                                className={`form-control ${errors.fullname? 'is-invalid': ''}`}
                                onChange={handleName}>
                            </input>
                            {errors.name && <div className='invalid-feedback'>{errors.fullname}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>City:</label>
                            <input
                                type='text'
                                placeholder='Enter city'
                                name='city'
                                value={city}
                                className={`form-control ${errors.city? 'is-invalid': ''}`}
                                onChange={handleCity}>
                            </input>
                            {errors.city && <div className='invalid-feedback'>{errors.city}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                                type='email'
                                placeholder='Enter email'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email? 'is-invalid': ''}`}
                                onChange={handleEmail}>
                            </input>
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Phone Number:</label>
                            <input
                                type='text'
                                placeholder='Enter phone number'
                                name='phone'
                                value={phonenumber}
                                className={`form-control ${errors.phonenumber? 'is-invalid': ''}`}
                                onChange={handlePhonenumber}>
                            </input>
                            {errors.phonenumber && <div className='invalid-feedback'>{errors.phonenumber}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateStudent}>Submit</button>
                    </form>
                </div>

            </div>
        </div>
      
    </div>
  )
}

export default StudentComponent
