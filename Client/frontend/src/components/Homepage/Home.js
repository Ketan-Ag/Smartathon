import { Axios } from 'axios';
import React from 'react'
import PostModal from '../Modal/Modal';
import "./home.css";

function Home() {
  const handlepost=()=>{
    <PostModal />
  }
  return (
    
        <div className='home'>
          <div className='home-content'>
          <div className='home-heading'>
          Make your Team
        </div>
        <div className='post-button' onClick={handlepost}>Post</div>

            
          </div>
        
    </div>
    
  );
}

export default Home;