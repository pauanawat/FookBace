import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import { Modal, Row, Col, Input, Button, message, Form, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import jwt from 'jsonwebtoken';
import user_Image from '../Pictures/user.png';
import close_icon from '../Pictures/closeIcon.png';
import upload_icon from '../Pictures/upload.png';
const { TextArea } = Input;

function CreatePost(props) {
    const [username,setUsername] = useState(props.username);
    const [text,setText] = useState('');
    const [photo,setPhoto] = useState('');
    const [visible,setVisible] = useState(false);
    const history = useHistory();

    const handleImageChange = (e) => {
        // e.preventDefault();
        let files = Array.from(e.fileList);
        files.forEach((index) => {
            let file = index.originFileObj;
            let reader = new FileReader();
            reader.onloadend = () => {
              setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        });
        setVisible(true);
        setText('');
    }    
    const onChangeText = (e) => {
        e.preventDefault();
        setText(e.target.value);
    }
    const deletePhoto = (index) => {
        setPhoto('');
    }
    const MyUploadButton = () => {
        return(
            <Upload onChange={handleImageChange} >
                <Button style={{border:'0px'}}>
                    <img src={upload_icon} style={{width:'35px',marginRight:'10px'}}/>
                    photo
                </Button>
            </Upload>
        );
    }
    const submit = () => {
        // const SECRET = 'secret'; // ให้เหมือนของ backend
        // const payload = {a:'a'}; // ยังไม่รู้จะใส่อะไร
        // const token = jwt.sign(payload, SECRET, { algorithm: 'HS256'});
        // const sendToBackend = {
        //     account_id: username,
        //     text: text,
        //     photo: photo
        // };
        // const header = {
        //     headers:{
        //         Authorization: token
        //     }
        // };
        // // TODO add api
        // axios.post('http://localhost:8080/login', sendToBackend, header)
        //     .then(res => {
        //         history.push(`/`);
        //     });
    }
    return(
        <div>
              <div style={prePostField}>
                <Row>
                    <Col span={2} align='right'>
                        <img src={user_Image} style={userImage} />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={21}>
                        <Button 
                            style={prePostImage}
                            // disabled
                            onClick={()=>setVisible(true)}
                        >What are you thinking?
                        </Button>
                    </Col>
                </Row>
                <Row style={{marginTop: '10px'}} justify="center">
                    <MyUploadButton/>
                </Row>
            </div>
              <Modal
                visible={visible}
                onCancel={()=>setVisible(false)}
                footer={null}
              >
                <Row justify="center">
                    Create post
                </Row>
                <Row style={body}>
                    <Col>
                        <img src={user_Image} style={userImage} />
                    </Col>
                    <Col style={{marginLeft:'5px'}}>
                        {username}
                    </Col>
                </Row>
                <Row style={{marginTop: '10px'}}>
                    {photo ===''
                        ?<div style={{width:'100%'}}>
                            <Row>
                                <TextArea 
                                    placeholder="What are you thinking?" 
                                    onChange={onChangeText} 
                                    value={text}
                                    id="textArea"
                                />
                            </Row>
                            <Row justify='center'>
                                <MyUploadButton/>
                            </Row>
                        </div>
                        :<div style={{width:'100%'}}>
                            <Button onClick={()=>deletePhoto()} style={{border:'0px'}}>
                                <img style={closeButton} src={close_icon}/>
                            </Button>
                            <img src={photo} style={{width:'100%'}}/>
                        </div>                        
                    }
                </Row>
                <Row justify="center" style={{marginTop:'10px'}}>
                    <Button type="primary" disabled={text==='' && photo.length===0} block onClick={submit}>Post</Button>
                </Row>
              </Modal>
        </div>
    );
}

//TODO css 
const prePostField = {
    margin: 'auto',
    marginTop: "50px",
    width: "35%",
    border: 'gray solid 2px',
    padding: '15px'
};
const body = {
    borderTop: '1px solid #E5E5E5',
    paddingTop: '15px',
    marginTop: '15px'
}
const userImage = {
    maxWidth: "30px",
    maxHight: "30px"
};
const prePostImage = {
    width: "100%",
    borderRadius: "15px",
    paddingLeft: "20px",
    textAlign: 'left'
};
const closeButton = {
    position:'absolute',
    top:'50px',
    right:'-420px',
    width:'40px',
    cursor:'pointer'
}

export default CreatePost;