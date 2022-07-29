import React from 'react'
import { Slide } from 'react-reveal'
import { useState } from 'react';

const DisplayBlog = (props) => {
    const {blog} = props
    const {title, author, description, likes, dislikes} = blog;
    const [like, setLike] = useState(false)
    const [dislike, setDIslike] = useState(false)
    const handleLikes = (e)=>{
        setLike(like=>!like)
        setDIslike(false)
    }
    const handleDislikes = ()=>{
        setDIslike(dislike=>!dislike)
        setLike(false)
    }
    return (
            <div className="row">
                <Slide right cascade>
                <div>
                <div className="col s10 offset-s1">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">{title}</span>
                            <p>{description}</p>                     </div>
                        <div className="card-action" style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <h6 style={{color: '#ffab40', margin: 0}}>- {author}</h6>
                        </div>
                            <div style={{width: '100%'}}>
                                <button className='btn' onClick={handleLikes} style={{margin: '3px 1%', width: '31%'}}>Like({like ? likes + 1 : likes})</button>
                                <button className='btn' onClick={handleDislikes} style={{margin: '3px 1%', width: '31%'}}>DisLike({dislike ? dislikes + 1 : dislikes})</button>
                                <button className='btn' disabled={true} style={{margin: '3px 1%', width: '31%'}}>Favourite</button>
                            </div>
                    </div>
                </div>
                </div>                
                </Slide>
            </div>
    )
}

export default DisplayBlog
