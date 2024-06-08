import React, { useState } from 'react'
// import React, { useState,useEffect, useRef } from 'react'
// import Table from 'react-bootstrap/Table';
// import io from 'socket.io-client';

const Connected = () => {
    const [info, setInfo] = useState({
        fullname: "",
        email: ""
    })
    // const [connUser, setConnUser] = useState([]);
    // const socketRef = useRef(null);
    // useEffect(() => {
    //     // Establish a Socket.IO connection
    //     socketRef.current = io('http://localhost:5050');

    //     // Add event listeners for Socket.IO events
    //     socketRef.current.on('connect', () => {
    //         console.log('Socket connected');
    //     });

    //     socketRef.current.on("visitors", (data) => {
    //         console.log("Hello");
    //         console.log(data);
    //         setConnUser(data);
    //     })

    //     socketRef.current.on('disconnect', () => {
    //         console.log('Socket disconnected');
    //     });


    //     // Clean up the Socket.IO connection when the component unmounts
    //     return () => {
    //         socketRef.current.disconnect();
    //     };
    // }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value
        })
    }
    const saveData = async (e) => {
        e.preventDefault();
        if (!info.fullname || !info.email) {
            alert("All Fileds Are Required");
        } else {
            console.log(info);
            // socketRef.current.emit("new_visitor", info);
        }
    }
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12">
                        <form>
                            <label htmlFor="fullname" className='my-2'>Fullname : </label>
                            <input type="text" className='form-control' onChange={handleChange} name="fullname" id='fullname' value={info.fullname} placeholder='Fullname' />
                            <label htmlFor="email" className='my-2'>Email : </label>
                            <input type="email" className='form-control' onChange={handleChange} name='email' id='email' value={info.email} placeholder='Email' />
                            <button className='btn btn-primary my-3' onClick={saveData}>Submit</button>
                        </form>
                        {/* {
                            connUser.length > 0 && <Table bordered hover size="sm">
                                <thead className='text-center'>
                                    <tr>
                                        <th>Id</th>
                                        <th>Fullname</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {
                                        connUser.map((users, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{users.fullname}</td>
                                                    <td>{users.email}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        } */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Connected;