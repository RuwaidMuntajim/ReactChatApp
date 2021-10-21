import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { firebase } from '../../Firebase/firebase';

const ChatRoom = ({ db, auth }) => {
    const { chatID } = useParams();
    const [user, setUser] = useState(null);
    const [docs, setDocs] = useState(null)
    const [msg, setMsg] = useState('');
    const dummy = useRef();
    
    //send message
    const sendMsg = (e) => {
        e.preventDefault();
        db.collection(chatID).add({
            username: user,
            text: msg,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            dummy.current.scrollIntoView({ behavior: 'smooth' });
        })
        setMsg('');
    }

    //delete message
    const deleteMsg = (id) => {
        db.collection(chatID).doc(id).delete();
    }

    useEffect(() => {

        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('users').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        if (doc.id === user.uid) {
                            setUser(doc.data().username);
                        }
                    })
                })
            }
        })

        setTimeout(() => {
            db.collection(chatID).orderBy('createdAt').onSnapshot(snapshot => {
            setDocs(snapshot.docs);
        })
        }, [3000])
        return () => {
            console.log('done');
        }
    }, [chatID, db, auth])


    return (
        <div>
            <div className="body">
                <div className=" messages">
                    {docs && docs.map(doc => (

                        user === doc.data().username ?
                            <div className="msg-usr-container" key={doc.id}>
                                <div className="msg-usr" key={doc.id}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <i className="fas fa-minus-square" onClick={() => deleteMsg(doc.id)}></i>
                                        <h6 className="usr-user" style={{ fontWeight: 'bold' }}>You</h6>
                                    </div>

                                    <hr id="hr" />
                                    <p style={{display: 'flex', flexWrap: 'wrap'}}>{doc.data().text}</p>
                                </div>
                            </div> :
                            <div className="msg-container" key={doc.id}>
                                <div className="msg" key={doc.id}>
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                        <h6 className="user" style={{ fontWeight: 'bold' }}>{doc.data().username}</h6>
                                    </div>

                                    <hr id="hr" />
                                    <p style={{display: 'flex', flexWrap: 'wrap'}}>{doc.data().text}</p>
                                </div>
                            </div>)
                        )
                    }
                </div>
                <div ref={dummy}></div>
            </div>

            <div className="footer">
                <form className="form">
                    <div className="input-group  flex">
                        <input type="text"
                            className="form-control"
                            placeholder="Say something nice"
                            style={{overflow: 'hidden', overflowY: 'scroll'}}
                            required
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                        />
                        <button
                            className="btn btn-success"
                            onClick={sendMsg}
                        >🦅</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChatRoom;
