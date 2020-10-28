import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import { Modal, Row, Col, Input, Button, message, Form, Upload, Popover } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import user_Image from '../picture/user.png';
import edit_icon from '../picture/edit.png';
import bin_icon from '../picture/bin.png';
import ellipsis_icon from '../picture/ellipsis.jpg';
import like_icon from '../picture/like.jpg';
import dislike_icon from '../picture/dislike.jpg';
import CreatePost from './CreatePost';

function Post(props) {
    const [username, setUsername] = useState(props.owner_name);
    const [ownerID, setOwnerID] = useState(props.owner_id);
    const [text, setText] = useState(props.content);
    const [type, setType] = useState(props.type);
    const [feedID, setFeedID] = useState(props.id);
    const [modalVisible,setModalVisble] = useState(false);
    const history = useHistory();
    const content = (
        <div>
            <Row> 
                <Button style={editButton} onClick={()=>deletePost()}>
                    <img src={bin_icon} style={iconImage} />
                    delete post
                </Button>
            </Row>
            <Row> 
                <Button style={editButton} onClick={()=>editPost()}>
                    <img src={edit_icon} style={iconImage} />
                        update post
                </Button>
            </Row>
        </div>
    );

    const deletePost = () => {
        axios.delete('http://localhost:8080/feed', {
            headers:{
                User: localStorage.getItem('token'),
                target: feedID
            }
        })
        .then(response => {
            console.log('feed: ',response.data);
            if(response.data.status ==='success.'){
                history.push('/home');
            };
        })
        .catch((error) => {
            console.log('error ' + error); 
        }); 
    }
    const likePost = () => {
        axios.post('http://localhost:8080/interact', {
            headers:{
                User: localStorage.getItem('token'),
                target: feedID,
                action: 'like'
            }
        })
        .then(response => {
            console.log('feed: ',response.data.status);
            if(response.data.status ==='success.'){
                history.push('/home');
            };
        })
        .catch((error) => {
            console.log('error ' + error); 
        }); 
    }
    const dislikePost = () => {
        axios.post('http://localhost:8080/interact', {
            headers:{
                User: localStorage.getItem('token'),
                target: feedID,
                action: 'dislike'
            }
        })
        .then(response => {
            console.log('feed: ',response.data.status);
            if(response.data.status ==='success.'){
                history.push('/home');
            };
        })
        .catch((error) => {
            console.log('error ' + error); 
        }); 
    }
    const editPost = () => {
        setModalVisble(true);
    }
    return(
        <div style={PostField}>
            <Row style={{justifyContent: 'space-between'}}>
                <Col>
                    {/* TODO get user image */}
                    <img src={user_Image} style={userImage} />
                    {username}
                </Col>
                <Col >
                    <Popover placement="bottomRight" content={content} trigger="click">
                            <img style={ellipsisButton} src={ellipsis_icon}/>
                        
                    </Popover>
                </Col>
            </Row>
            <Row style={{marginTop: '10px'}} >
                {type == 'message'
                ?text
                :<img style={{width: '100%'}} src={text}/>}
            </Row>
            <Row>
                {type == 'message'
                ?<CreatePost 
                    isEdit={true} 
                    modalVisible={modalVisible} 
                    setModalVisible={setModalVisble}
                    text={text}
                    photo={''}/>
                :<CreatePost 
                    isEdit={true} 
                    modalVisible={modalVisible} 
                    setModalVisible={setModalVisble}
                    text={''}
                    photo={text}/>}
            </Row>
            <Row style={likeBox} gutter={5}>
                <Col span={12}>
                    <Button style={likeButton} onClick={()=>likePost()}>
                        <img src={like_icon} style={likeIcon}/>
                        like
                    </Button>
                </Col>
                <Col span={12}>
                    <Button style={likeButton} onClick={()=>dislikePost()}>
                        <img src={dislike_icon} style={likeIcon}/>
                        dislike
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
const PostField = {
    margin: 'auto',
    marginTop: "15px",
    width: "80%",
    border: 'gray solid 2px',
    borderRadius: '10px',
    padding: '15px'
};
const userImage = {
    maxWidth: "30px",
    maxHight: "30px",
    marginRight:'10px'
};
const iconImage = {
    maxWidth: "20px",
    maxHight: "20px",
    marginRight:'10px',
    align: 'left'
};
const editButton = {
    width:'100%', 
    border:'0px',
    padding:'0'
};
const ellipsisButton = {
    maxWidth:'25px'
}
const likeBox = {
    marginTop:'5px', 
    borderTop: '1px solid #CCCCCC',
    borderBottom: '1px solid #CCCCCC',
    padding: '5px'
}
const likeIcon = {
    marginRight: '10px',
    maxWidth: '20px',
}
const likeButton = {
    width: '100%',
    // border: '1px'
}
export default Post;