import React, { useState } from 'react';
// import React, { useState, useEffect, useRef } from 'react';
import Rooms from "../pages/Rooms";
// import io from 'socket.io-client';

const RoomChat = () => {
    // const socketRef = useRef(null);
    // const [myArr, setMyArr] = useState([]);
    const [roomName, setIsRoom] = useState("");
    const [msg, setMsg] = useState("");
    // const [isTyping, setIsTyping] = useState(false);
    // useEffect(() => {
    //     socketRef.current = io('http://localhost:5052');

    //     socketRef.current.on('connect', () => {
    //         console.log('Socket connected');
    //     });

    //     socketRef.current.on('message', (data) => {
    //         setMyArr((prevMessages) => [
    //             ...prevMessages,
    //             { name: data.name, message: data.message }
    //         ])
    //     });

    //     socketRef.current.on('typing', (data) => {
    //         console.log(data);
    //         setIsTyping(true);
    //     });

    //     socketRef.current.on('stopped_typing', (data) => {
    //         console.log(data);
    //         setIsTyping(false);
    //     });

    //     socketRef.current.on('disconnect', () => {
    //         console.log('Socket disconnected');
    //     });

    //     return () => {
    //         socketRef.current.disconnect();
    //     };
    // }, []);



    const joinRoom = (room) => {
        if (room) {
            setIsRoom(room);
            // socketRef.current.emit("join_room", room);
        }
    }

    // const handleTyping = () => {
    //     console.log("Typing");
    //     socketRef.current.emit("typing", { room: roomName });
    //     setIsTyping(true);
    // }

    // const handleStoppedTyping = () => {
    //     console.log("stop Typing");
    //     socketRef.current.emit("stopped_typing", { room: roomName });
    //     setIsTyping(false);
    // }

    const sendMsg = (e) => {
        e.preventDefault();
        console.log(msg);
        // setMyArr((prevMessages) => [
        //     ...prevMessages,
        //     { name: "You", message: msg }
        // ])
        // console.log(roomName, msg);
        // socketRef.current.emit('message', { room: roomName, message: msg });
        // setMsg("");
    }

    return (
        <div className="container">
            <div className="row mt-5">
                {/* <div className="col-12">
                    {isTyping ? <p>Typing</p> : ""}
                    {
                        roomName ? <div className="card">
                            <div className="card-body">
                                <div className="chat-messages">
                                    {
                                        myArr.map((values, index) => {
                                            return (
                                                <div className="row" key={index}>
                                                    <div className="col-1"><p>{values.name} : </p></div>
                                                    <div className="col-11"><p>{values.message}</p></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="card-footer">
                                <form>
                                    <input type="text" className="form-control" onFocus={handleTyping} onBlur={handleStoppedTyping} onChange={(e) => { setMsg(e.target.value) }} value={msg} placeholder="Type your message..." />
                                    <button className="btn btn-primary mt-3" onClick={sendMsg}>Send</button>
                                </form>
                            </div>
                        </div> : <ul className='text-center'>
                            {
                                Rooms.map((room, index) => {
                                    return (
                                        <li key={index} className='mt-3' style={{ listStyle: "none", fontSize: "20px" }}>{room.roomName} <button className='btn btn-success my-3 mx-3' onClick={() => { joinRoom(room.roomName) }}>Join Room</button></li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div> */}
                <div className="col-12">
                    {
                        roomName ? <div className="card">
                            <div className="card-body">
                                {/* <div className="chat-messages">
                                    {
                                        myArr.map((values, index) => {
                                            return (
                                                <div className="row" key={index}>
                                                    <div className="col-1"><p>{values.name} : </p></div>
                                                    <div className="col-11"><p>{values.message}</p></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div> */}
                            </div>
                            <div className="card-footer">
                                <form>
                                    <input type="text" className="form-control" onChange={(e) => { setMsg(e.target.value) }} value={msg} placeholder="Type your message..." />
                                    <button className="btn btn-primary mt-3" onClick={sendMsg}>Send</button>
                                </form>
                            </div>
                        </div> : <ul className='text-center'>
                            {
                                Rooms.map((room, index) => {
                                    return (
                                        <li key={index} className='mt-3' style={{ listStyle: "none", fontSize: "20px" }}>{room.roomName} <button className='btn btn-success my-3 mx-3' onClick={() => { joinRoom(room.roomName) }}>Join Room</button></li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}

export default RoomChat;