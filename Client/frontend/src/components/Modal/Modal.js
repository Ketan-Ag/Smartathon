import React,{useState} from 'react'

function PostModal(props) {
    // useEffect(() => {
    //   console.log('props.show', props.show)
    // }, [])
     const [show,setShow]=useState(true)
    
    return (
      show && (
        <div
          className="modal-parent"
          onClick={(event) => {
            const isOutside = (!event.target.closest(".modal-content") & !event.target.closest(".heading-of-modal"));
            if (isOutside) {
              setShow(false)
            }
          }}
        >
          <div class="heading-of-modal">
            <p className="modal-heading-p">Make Your Team</p>
            <div
              className="closing-cross"
              onClick={() => {
                setShow(false)
              }}
            >
              X
            </div>
          </div>
          <div className="modal-content">
            <br />
            <div class="fade_rule-modal"></div>
            <div class="modal-external-content">{props.children}</div>
            <div class="fade_rule-modal"></div>
            <br />
          </div>
        </div>
      )
    );
  }

export default PostModal