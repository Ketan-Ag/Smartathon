import React,{useRef}from "react";
import { useSpring, animated } from 'react-spring';
import SignIn from "../SignIn";
import "./signinmodal.css";
function SigninModal(setOpenModal) {   
//   const animated=useSpring({
//   config:{
//       duration:250
//   },
//   opacity:1,
//   transform: setOpenModal? `translateY(0%) : translateY(-100%)`
// });
const modalRef = useRef();
// const animation = useSpring({
//   config: {
//     duration: 250
//   },
//   opacity: props.setOpenModal ?1:0,
//   transform: props.setOpenModal ? `translateY(0%)` : `translateY(-100%)`
// });
const closeModal = e => {
  if (modalRef.current === e.target) {
    setOpenModal(false);
  }
};

  return (
   
    <div className="modalBackground1" onClick={closeModal} ref={modalRef}>
      
      <div className="modalContainer1">
        {/* <div > */}
        <div className="modalclose">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
           >
            X
          </button>
        </div>
        {/* {console.log(props.modal)} */}
       <SignIn />
      </div>
      
    </div>
    
  );
}

export default SigninModal;