import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client';


const PublicChat = () => {
    const socketRef = useRef(null);
    const [joinName, setJoinName] = useState("");
    const [msg, setMsg] = useState("");
    const [isReady, setIsReady] = useState(false);
    const [connUser, setConnUser] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        // Establish a Socket.IO connection
        socketRef.current = io('http://localhost:5054');

        // Add event listeners for Socket.IO events
        socketRef.current.on('connect', () => {
            console.log('Socket connected');
        });

        socketRef.current.on("visitors", (data) => {
            setConnUser(data);
        })

        socketRef.current.on("message", (data) => {
            setChatMessages((prevMessages) => [...prevMessages, { name: data.name, message: data.message }]);
        })

        socketRef.current.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const joinChat = (e) => {
        e.preventDefault();
        console.log(joinName);
        socketRef.current.emit("add_user", joinName);
        socketRef.current.on("server_msg", (data) => {
            setChatMessages((prevMessages) => [...prevMessages, {
                name: data.name,
                message: data.message
            }]);
        })
        setIsReady(true);
    }

    const sendMsg = (e) => {
        e.preventDefault();
        setChatMessages((prevMessages) => [...prevMessages, { name: "You", message: msg }]);
        socketRef.current.emit("message", { name: joinName, message: msg })
        setMsg('');
    }

    return (
        <div className="container mt-5">
            {
                isReady ? <div className="row">
                    <div className="col-9">
                        <div className="card">
                            <div className="card-body">
                                <div className="chat-messages">
                                    {
                                        chatMessages.map((values, index) => {
                                            return (
                                                <div className="row" key={index}>
                                                    <div className="col-2"><p>{values.name} </p></div>
                                                    <div className="col-1"><p>:</p></div>
                                                    <div className="col-9"><p>{values.message}</p></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="card-footer">
                                <form>
                                    <input type="text" className="form-control" onChange={(e) => { setMsg(e.target.value) }} value={msg} placeholder="Type your message..." />
                                    <button className="btn btn-primary mt-3" onClick={sendMsg}>Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <ul className='text-center'>
                            <h2>Online Users</h2>
                            {
                                connUser.map((values, index) => {
                                    return (
                                        <li style={{ listStyle: "none", fontSize: "20px", cursor: "pointer" }} key={index}>{values}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div> :
                    <div className="row">
                        <div className="col-12">
                            <form>
                                <input type="text" className="form-control" onChange={(e) => { setJoinName(e.target.value) }} value={joinName} placeholder="Type your message..." />
                                <button className="btn btn-primary mt-3" onClick={joinChat}>Join Chat</button>
                            </form>
                        </div>
                    </div>
            }
        </div>
    )
}

export default PublicChat;