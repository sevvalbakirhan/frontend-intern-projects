import '../css/Product.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function Product({ product }) {
    const { id, price, image, title, description } = product;

    const navigate = useNavigate();

    return (
        <div className='card'>
            <img className='image' src={image} alt="" />
            <div>
                <p style={{ height: '80px' }}>{title}</p>
                <h3 className='price'>{price} ₺</h3>
            </div>
            <div>
                <button
                    onClick={() => {
                        navigate("/product-details/" + id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="button-details"
                >
                    Details
                </button>
            </div>
        </div>
    )
}

export default Product
