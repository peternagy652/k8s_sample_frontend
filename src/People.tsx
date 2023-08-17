import axios from "axios";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./People.css";
import { useEffect, useState } from "react"

interface Person {
    Id: string,
    Name: string,
    Age: number,
}

export const People = () => {
    const [hello, setHello] = useState<string>("");
    const [persons, setPersons] = useState<Person[]>([]);

    useEffect(() => {
        axios.get('/hello').then((response) => {
            setHello(response.data);
        })
    }, [])

    const getPeople = () => {
        axios.get('/persons').then((response) => {
            response.data.Persons && setPersons(response.data.Persons);
        })
    }

    const generatePeople = () => {
        axios.post('/generate?count=10');
    }

    const deletePeople = () => {
        axios.delete('/persons').then((response) => {
            if (response.status === 200) {
                setPersons([]);
            }
        });
    }

    return (
        <>
        <h1>{hello}</h1>
        <div className="container">
            <Button variant="contained" onClick={() => generatePeople()} style={{margin: "10px"}}>Generate people</Button>
            <Button variant="contained" onClick={() => deletePeople()} style={{margin: "10px"}}>Delete people</Button>
            <Button variant="contained" onClick={() => getPeople()}  style={{margin: "10px"}}>List people</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="right">Age</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {persons.map((p) => (
                        <TableRow
                        key={p.Id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {p.Id}
                            </TableCell>
                            <TableCell align="left">{p.Name}</TableCell>
                            <TableCell align="right">{p.Age}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </>
    )
}