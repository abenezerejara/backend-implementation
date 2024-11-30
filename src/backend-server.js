import express from 'express';
import cors from 'cors';
import {fetchStudents, saveStudents, deleteStudents} from './firebaseService.js';

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.get('/secret', (req, res) => {
    res.send("Secret Message: Currently listening to Way 2 Sexy")
});

app.post('/Students', async(req, res) => {
    try{
        const newStudent = req.body; //Extract the new student
        const savedStudent = await saveStudents(newStudent); //Save the student data.
        console.log(newStudent);
        res.status(201).json(savedStudent); //Send a response with the saved student data
    } catch (error){
        console.error("Error saving student:", error);
        res.status(500).json({ message: "Failed to save student" }); // Send an error response in case of failure

    }
})

app.get('/Students', async (req, res) => {
    try{
        const students = await fetchStudents();
        //console.log(students);
        res.json(students);
    } catch(error) {
        res.status(500).send('Failed to fetch students: ' + error.message);
    }
})

app.delete('/Students/:id', async (req, res) => {
    try{
        const id = req.params.id;
        await deleteStudents(id);
        res.status(200).send('Student removed');//send a response with the new data or a success?
    } catch(error){
        res.status(500).json('Failed to remove student: ' + error.message);
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

//The app starts a server and listens on port 3000 for connections. The app responds with 
//'Hello World!' for requests to the root URL (/) or route.

//For every other path, it will respond with a 404 Not Found.