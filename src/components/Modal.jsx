import React from 'react'
import { closeModal } from '../features/modal/modalSlice'
import { clearCart } from '../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'


const Modal = () => {
    const {cartItems} = useSelector((store)=>store.cart)
    const dispatch = useDispatch()
  return (
    <aside className='modal-container'>
        <div className="modal">
            <h4>remove all from you cart?</h4>
            <div className="btn-container">
                <button className="btn confirm-btn" onClick={()=>{
                    
                    dispatch(clearCart())     
                    
                    dispatch(closeModal())
                    }}>
                    confirm
                </button>
                 <button className="btn clear-btn" onClick={()=>dispatch(closeModal())}>
                    cancel
                </button>
            </div>
        </div>
    </aside>
  )
}

export default Modal