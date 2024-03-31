import { useEffect, useState } from 'react'
import React from 'react'
import { listStudents, deleteStudent } from '../services/StudentService'
import { useNavigate } from 'react-router-dom'


const ListStudent = () => {
    const [student, setStudents] = useState([])

    const navigator = useNavigate();

    useEffect(()=>{
        getAllStudents();
    },[])

    function getAllStudents(){
        listStudents().then((response)=>{
            setStudents(response.data);
        }).catch(error=>{
            console.error(error);
        });
    }
    function addStudent(){
        navigator('/add-student')
    }

    function updateStudent(id){
        navigator(`/update-student/${id}`)
    }

    function removeStudent(id){
        console.log(id);

        deleteStudent(id).then((response)=>{

        getAllStudents();

        }).catch(error =>{
            console.error(error);
        });
    }

  return (
    <div className='container'>
      <h2 className='text-center'>List of Students</h2>
      <button className='btn btn-success mb-2' onClick={addStudent}>Add Student</button>
      <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Student Id</th>
                <th>Full Name</th>
                <th>City</th>
                <th>Phone number</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                student.map(student =>
                    <tr key={student.id}>
                        <td className='center-table-cell'>{student.id}</td>
                        <td className='center-table-cell'>{student.fullname}</td>
                        <td className='center-table-cell'>{student.city}</td>
                        <td className='center-table-cell'>{student.phonenumber}</td>
                        <td className='center-table-cell'>{student.email}</td>
                        <td>
                            <button className='btn btn-outline-success' onClick={() => updateStudent(student.id)}> Update </button>
                            <button className='btn btn-outline-danger' onClick={() => removeStudent(student.id)} style={{margin:'10px'}}> Delete </button>
                        </td>
                    </tr>)
            }
           
        </tbody>
      </table>
    </div>
  )
}

export default ListStudent

