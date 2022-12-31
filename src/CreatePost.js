import React, {useState} from 'react';
import {Button} from '@material-ui/core'
import './CreatePost.css'

const BASE_URL = 'https://schuna-restapi.onrender.com/'

function CreatePost({authToken, authTokenType, userId}) {
    const [caption, setCaption] = useState('');
    const [imageUrl, setImageUrl] = useState('');


    const handleCreatePost = (e) => {
        e?.preventDefault();

        const json_string = JSON.stringify({
            'image_url': imageUrl,
            'caption': caption,
            'user_id': userId
        })

        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Authorization': authTokenType + ' ' + authToken,
                'Content-Type': 'application/json'
            }),
            body: json_string
        }

        fetch(BASE_URL + 'post', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                window.location.reload()
                window.scrollTo(0, 0)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="create_post">
            <input
                type="text"
                placeholder="Enter a caption"
                onChange={(event) => setCaption(event.target.value)}
                value={caption}
            />
            <input
                type="text"
                placeholder="Enter a image url"
                onChange={(event) => setImageUrl(event.target.value)}
                value={imageUrl}
            />

            <Button className="create_post_button" onClick={handleCreatePost}>
                Create Post
            </Button>
        </div>
    )
}

export default CreatePost;