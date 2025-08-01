import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setSelectedProduct } from '../redux/slices/productSlice';
import '../css/ProductDetails.css'
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';
import { toast } from 'react-toastify';




function ProductDetails() {
    const { id } = useParams();
    const { products, selectedProduct } = useSelector((store) => store.product)

    const { price, image, title, description } = selectedProduct;

    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const addBasket = () => {
        if (count === 0) {
            toast.error("Please select at least 1 item.");
            return;
        }

        const payload = {
            id,
            price: Number(price),
            image,
            title,
            description,
            count
        }


        dispatch(addToBasket(payload));
        toast.success("Product successfully added to basket!");
        dispatch(calculateBasket());

    }

    useEffect(() => {
        getProductById();
    }, [])
    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product));

            }
        })
    }

    return (
        <div className="product-details-container">
            <div className="product-details-image-wrapper">
                <img src={image} alt={title} className="product-details-image" />
            </div>
            <div className="product-details-info">
                <h2 className="product-details-title">{title}</h2>
                <p className="product-details-description">{description}</p>
                <span className="product-details-price">{price} ₺</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaCircleMinus onClick={decrement} style={{ fontSize: '40px', marginRight: '10px' }} />
                    <span style={{ fontSize: '35px' }}>{count}</span>
                    <FaCirclePlus onClick={increment} style={{ fontSize: '40px', marginLeft: '10px' }} />


                </div>
                <div>
                    <button onClick={addBasket}>Click here to add to cart
                    </button>
                </div>
            </div>
        </div>
    );

}

export default ProductDetails
