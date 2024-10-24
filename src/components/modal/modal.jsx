import React, { useCallback, useEffect, useRef, useState } from "react"; 
import Portal, { createContainer } from "../Portal/Portal.jsx"; 
import "./Modal.css"; 

const MODAL_CONTAINER_ID = "modal-container-id"; 

const Modal = (props) => {
  const { id, itemsList, onClose, children } = props; 

  const rootRef = useRef(null); 
  const [isMounted, setMounted] = useState(false); 

  useEffect(() => { 
    createContainer({ id: MODAL_CONTAINER_ID }); 
    setMounted(true); 
  }, []); 

  useEffect(() => { 
    const handleWrapperClick = (event) => { 
      const { target } = event; 

      if (target instanceof Node && rootRef.current === target) { 
        onClose?.(); 
      } 
    }; 
    const handleEscapePress = (event) => { 
      if (event.key === "Escape") { 
        onClose?.(); 
      } 
    }; 

    window.addEventListener("click", handleWrapperClick); 
    window.addEventListener("keydown", handleEscapePress); 

    return () => { 
      window.removeEventListener("click", handleWrapperClick); 
      window.removeEventListener("keydown", handleEscapePress); 
    }; 
  }, [onClose]); 
  
  const handleClose = useCallback(() => { 
    onClose?.(); 
  }, [onClose]); 

  return isMounted ? ( 
    <Portal id={MODAL_CONTAINER_ID}> 
      <div className='wrap' ref={rootRef} data-testid="wrap"> 
        <div className='content'> 
          {React.cloneElement(children, { onModalClose: handleClose })}
        </div> 
      </div> 
    </Portal> 
  ) : null; 
}; 

export default Modal;