import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/actionProduct';
import { addItem } from '../redux/actions/actionCart';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Product = () => {
  window.scrollTo(0,0);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const productDetails = useSelector(state => state.productDetails);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { id }= useParams();
  const [qty, setQty] = useState(1);

  const { product, loading, error } = productDetails;

  const handleQuantity = (e) =>{
    e.preventDefault();
    if(qty > product.avaiableStock || qty < 0) setQty(1);
    if(e.target.innerText === '+' && qty !== product.avaiableStock) setQty(qty => qty + 1 );
    if(e.target.innerText === '-' && qty !== 1) setQty(qty => qty - 1 );
  }

  const addToCart = (e) => {
    e.preventDefault();
    if(!userInfo) navigate('/login');
    dispatch(addItem(id, qty));
  }
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id])

  return (
    <div className='main'>
      <Navbar/>
      {
        loading ? 
            <div>Loading...</div> 
            :
            error ? 
            <div className='noProductFound text-center'>
              <div>
                Some went wrong,
              </div>
             <Link className='text-white' to={'/login'}>
               login again 
            </Link>
            </div>
            :
            <div className='productAllDetails'>
              <div className='productDetails'>
                  <img src={product?.image} alt="No images Found" className='productImg'/>
                  <div className='productSubDetails'>
                      <div className='productName'>Name: { product?.name }</div>
                      <div className='productDescription'>Description: { product?.description }</div>
                      <div className='productReview'>Rating: { product?.rating } Star</div>
                      <div className='productPrice'>Price: { product?.price }</div>
                      <div className='productQuantity'>
                          Quantity: 
                          {
                            product?.avaiableStock > 0
                            ?
                            <div className='productSubQuanity'>
                              <button className='quantityButtons' onClick={(e) => handleQuantity(e)}>-</button>
                              <div className={`quantity ${product?.avaiableStock === qty ? 'text-red' : ''}`}> {qty} </div>
                              <button className='quantityButtons' onClick={(e) => handleQuantity(e)}>+</button>
                          </div>
                          :
                          <div className='productSubQuanity text-red'>
                            Out of Stock
                        </div> 
                          }
                      </div>
                      <button className='button' hidden={!product?.avaiableStock > 0} onClick={(e) => addToCart(e)}>{!userInfo ? 'Login for add to cart...' : 'Add to Cart...'}</button>
                  </div>
              </div>
              <div className='writeReview'>
                  <h1>Add your review</h1>
                  <div className='stars'>
                      stars - add icons
                  </div>
                  <textarea placeholder='Add comment for review...' className='reviewInput' disabled={true}/>
              </div>
              <div className='showReview'>
                  <h1>Reviews</h1>
                  {
                      product?.numberReviews === 0 
                      ?
                      <div className='reviewsFontSize'>No Reviews found for this product.</div>
                      :
                      <div>{product?.numReviews}</div>
                  }
                  
              </div>
            </div>
      }
      <Footer/>
    </div>
  )
}

export default Product