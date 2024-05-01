import React, { useState } from "react";

const ColorRadioButton = ({ value, checked, onChange }) => {
  return (
    <label  className="colorbutton">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{value}</span>
    </label>
  );
};

const SizeRadioButton = ({ size, checked, onChange }) => {
    return (
      <div>
        <label>
          <input
            type="radio"
            value={size}
            checked={checked}
            onChange={onChange}
          />
          <span>
            {size}
          </span>
        </label>
      </div>
    );
};

const OfferRadioButton = ({ offer, checked, onChange }) => {
  return (
    <label className="rectangle_button">
      <input
        type="radio"
        value={offer}
        checked={checked}
        onChange={onChange}
      />
      {offer}
    </label>
    
  );
};

const MinMaxRadioButton = ({ text, checked, onChange }) => {
  return (
    <label>
      <input
        type="radio"
        value={text}
        checked={checked}
        onChange={onChange}
      />
      {text}
    </label>
  );
};

const ProductLists = ({ Datas }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedOffer, setSelectedOffer] = useState("");
  const [minMax, setMinMax] = useState("");
  const [filterClicked, setFilterClicked] = useState(false);

  const handleColorChange = (e) => {
      setSelectedColor(e.target.value);
  };

  const handleSizeChange = (e) => {
      setSelectedSize(e.target.value);
  };

  const handleOfferChange = (e) => {
      setSelectedOffer(e.target.value);
  };

  const handleMinMaxChange = (e) => {
      setMinMax(e.target.value);
  };

  const filterProducts = () => {
      return Datas.filter((product) => {
          return (
              (selectedColor === "" || product.color.includes(selectedColor)) &&
              (selectedSize === "" || product.product_sizes.some((size) => size.name === selectedSize)) &&
              (selectedOffer === "" || product.offer === selectedOffer) &&
              (minMax === "" || (minMax === "Min" ? product.mrp <= 1000 : product.mrp > 1000))
          );
      });
  };

  const handleFilterClick = () => {
      setFilterClicked(true);
  };

  const filteredProducts = filterClicked ? filterProducts() : Datas;

  // Get unique colors from Datas
  const uniqueColors = [...new Set(Datas.flatMap(product => product.color))];
  const uniqueSizes = [...new Set(Datas.flatMap(product => product.product_sizes.map(size => size.name)))];
  const uniqueOffers = [...new Set(Datas.map(product => product.offer))];

  return (
      <div className="main">
          <div className="left">
              <div className="colorsdiv">
                  <h3>Colors</h3>
                  <div className="colorsbutton">
                      {uniqueColors.map(color => (
                          <ColorRadioButton
                              key={color}
                              value={color}
                              checked={selectedColor === color}
                              onChange={handleColorChange}
                          />
                      ))}
                  </div>
              </div>
              <div className='sizesdiv'>
                  <h3>Size</h3>
                  <div className="sizebutton">
                      {uniqueSizes.map(size => (
                          <SizeRadioButton
                              key={size}
                              size={size}
                              checked={selectedSize === size}
                              onChange={handleSizeChange}
                          />
                      ))}
                  </div>
              </div>
              <div className="offersdiv">
                  <h3>Offers</h3>
                  <div className="offerbutton">
                      {uniqueOffers.map(offer => (
                          <OfferRadioButton
                              key={offer}
                              offer={offer}
                              checked={selectedOffer === offer}
                              onChange={handleOfferChange}
                          />
                      ))}
                  </div>
              </div>
              <div className="rangediv">
                  <h3>Pricing range</h3>
                  <div className="rangebutton">
                      <MinMaxRadioButton
                          text="Min"
                          checked={minMax === "Min"}
                          onChange={handleMinMaxChange}
                      />
                      <MinMaxRadioButton
                          text="Max"
                          checked={minMax === "Max"}
                          onChange={handleMinMaxChange}
                      />
                  </div>
                  <div className="filterdiv">
                      <button className="filterbutton" onClick={handleFilterClick}>Filter</button>
                  </div>
              </div>
          </div>
          <div className="product">
              <h2>Products</h2>
              <div className="sidebar">
                  {filteredProducts.map((product) => (
                      <div key={product.id} className={`product product ${product.id}`}>
                          <div className="child">
                              <h3>{product.name}</h3>
                              <p>Design:{product.design}</p>
                              <p>color:{product.color}</p>
                              <p>Product Sizes:{product.product_sizes.map((level, index) => (
                                  <span key={index}>{level.name}
                                      {index !== product.product_sizes.length - 1 && ','}</span>))}
                              </p>
                              <p>Rs.{product.mrp}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );
};

export default ProductLists;
