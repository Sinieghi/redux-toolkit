import React from 'react'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux';
//isso aqui é o return la no cartSlice, Redux é um useReducer mais pratico
// import { clearCart } from '../features/cart/cartSlice';
import { openModal } from '../features/modal/modalSlice';

const CartContainer = () => {
    const dispatch = useDispatch()
    const {cartItems, total, amount} = useSelector((store)=>store.cart)
    // console.log(cartItem);


  if(amount < 1){
    return <section className='cart'>
        <header>
            <h2>your bag</h2>
            <h4 className="empty-cart">is empty</h4>
        </header>
    </section>
  }
  
    return (
    <section className='cart'>
        <header>
            <h2>your bag</h2>
        </header>
        <div>
            {cartItems.map((item)=>{
                return <CartItem key={item.id} {...item}/>
            })}
        </div>
        <footer>
            <hr />
<h4>total <span>${total.toFixed(2)}</span></h4>
             <button className="btn clear-btn" onClick={()=>dispatch(openModal())}>clear</button>
        </footer>
    </section>
  )
}

export default CartContainer