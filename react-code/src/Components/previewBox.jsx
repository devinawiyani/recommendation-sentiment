import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import "../styles.css";

function PreviewBox(props){
  const [isHovered, setIsHovered] = useState(false);
  
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTitleClick = (event) => {
    event.preventDefault();

    const inputData = props.item_url;

    // Send data to backend
    fetch('/input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputData }),
    })
      .then(response => response.json()
            )
      .catch((error) => {
        console.log('error', error)
      });

    // Redirect to the result page
    navigate('/resultPage');
  };


    return(
        <div className='container-preview'>
            <div class="image-wrapper">
                <img className="item-img-prev" src= {props.item_image} alt="Item 1" />
            </div>

            <div class="text-wrapper">
                <div className="item-title-preview"><a 
                  style={{ color: '#272824', textDecoration: isHovered ? 'underline' : 'none', cursor:'pointer' }} 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave} 
                  onClick={handleTitleClick}
                  >{props.item_name}</a></div>

                <div className="item-shop-preview">{props.shop_name}</div>
                  <div className="item-price-preview">{props.item_price}</div>

            </div>
        </div>

    );
}

export default PreviewBox;
