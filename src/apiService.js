//TODO: implement the CRUD functions 
//NOTE: this is responsible for the communication between the backend and frontend.
//Data from the frontend should be sent through this service to the backend.

import axios from "axios";

const apiClient = axios.create({
    baseURL:"http://localhost:3000/Students", //backend server URL.
})

//function to send data using the post function in the firebaseService.
export const createStudent = async (newStudent) => {
    const response = await apiClient.post('/', newStudent);
    console.log(response)
    //because i did not uncomment this code it was not working. 
    // How was the program supposed to know what it was when it was not returning anything.
    return response.data;
}

export const fetchStudents = async () => {
    const response = await apiClient.get('/');
    console.log(response);
    return response.data;
}




//function to get data using the get function in the firebaseService.

//function to delete data using the get function in the firebaseService.