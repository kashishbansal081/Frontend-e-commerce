import { useState, useEffect } from "react";
import useFetch from "../customHooks/useFetch";

export default function FitlerSection({
  categoryId,
  onFilterChange,
  searchItem,
}) {
  const { data } = useFetch(`https://backend-e-commerce-ashen.vercel.app/v1/api/products`);

  const [checkbox, setCheckbox] = useState([]);
  const [currentRange, setCurrentRange] = useState(10000);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sorting, sortHandler] = useState("LowToHigh");

  let filteredProducts = data?.data || [];

  if (categoryId) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === categoryId
    );
  }

  if (searchItem && searchItem.trim().length > 0) {
    const searchLower = searchItem.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchLower)
    );
  }

  let filterProducts = filteredProducts?.filter((product) => {
    const matchPrice =
      currentRange === 10000 ? true : product.productPrice <= currentRange;
    const matchRating =
      !selectedRating || product.productRating >= selectedRating;
    const matchBrand =
      checkbox.length === 0 || checkbox.includes(product.productBrandName);

    return matchPrice && matchRating && matchBrand;
  });

  if (filterProducts.length > 0) {
    if (sorting === "LowToHigh") {
      filterProducts = [...filterProducts].sort(
        (a, b) => a.productPrice - b.productPrice
      );
    } else if (sorting === "HighToLow") {
      filterProducts = [...filterProducts].sort(
        (a, b) => b.productPrice - a.productPrice
      );
    }
  }

  function categoryHandler(e) {
    const { checked, value } = e.target;
    if (checked) {
      setCheckbox((prev) => [...prev, value]);
    } else {
      setCheckbox((prev) => prev.filter((val) => val !== value));
    }
  }

  function rangeHandler(e) {
    const range = e.target.value;
    setCurrentRange(range);
  }

  function ratingHandler(e) {
    const selectedRating = e.target.value;
    if (selectedRating >= 4) {
      setSelectedRating(4);
    } else if (selectedRating < 4 && selectedRating >= 3) {
      setSelectedRating(3);
    } else if (selectedRating < 3 && selectedRating >= 2) {
      setSelectedRating(2);
    } else {
      setSelectedRating(1);
    }
  }

  function resetFormHandler() {
    setCheckbox([]);
    setCurrentRange(10000);
    setSelectedRating(null);
    sortHandler("LowToHigh");
  }

  useEffect(() => {
    onFilterChange(filterProducts);
  }, [checkbox, currentRange, selectedRating, sorting, data, searchItem]);

  return (
    <form>
      <div className="clear-filter d-flex align-items-center justify-content-between">
        <h3>Filters</h3>
        <button
          type="reset"
          className="fw-bold fs-5 mt-2 rounded"
          value="Clear form"
          onClick={resetFormHandler}
        >
          Clear
        </button>
      </div>
      <div className="price mt-3">
        <h3 className="text-start">Price</h3>
        <div className=" mt-4">
          <div className="d-flex justify-content-between px-2">
            <span>10000</span>
            <span>50000</span>
            <span>100000</span>
          </div>

          <input
            type="range"
            min="10000"
            max="100000"
            step="5000"
            defaultValue="10000"
            className="form-range w-100"
            id="myRange"
            onChange={rangeHandler}
          />
          <p className="text-start">Current Price: {currentRange}</p>
        </div>
      </div>

      <div className="category text-start mt-4">
        <h3>Brand</h3>
        {data?.data
          ?.filter(
            (product, index, self) =>
              index ===
              self.findIndex(
                (p) => p.productBrandName === product.productBrandName
              )  && product.category === categoryId
          )
          .map((product) => {
            return (
              <div key={product._id}>
                <input
                  type="checkbox"
                  id={product.productBrandName}
                  value={product.productBrandName}
                  name={product.category}
                  onChange={categoryHandler}
                />
                <label htmlFor={product.productBrandName} className="ms-2">
                  {product.productBrandName}
                </label>
                <br />
              </div>
            );
          })}
      </div>

      <div className="rating text-start mt-4">
        <h3>Rating</h3>
        <input
          type="radio"
          name="rating"
          value="4"
          className="me-2"
          id="rating4"
          onClick={ratingHandler}
        />{" "}
        <label htmlFor="rating4">4 Star & above</label>
        <br />
        <input
          type="radio"
          name="rating"
          value="3"
          className="me-2"
          id="rating3"
          onClick={ratingHandler}
        />{" "}
        <label htmlFor="rating3">3 Star & above</label>
        <br />
        <input
          type="radio"
          name="rating"
          value="2"
          className="me-2"
          id="rating2"
          onClick={ratingHandler}
        />{" "}
        <label htmlFor="rating2">2 Star & above</label>
        <br />
        <input
          type="radio"
          name="rating"
          value="1"
          className="me-2"
          id="rating1"
          onClick={ratingHandler}
        />{" "}
        <label htmlFor="rating1">1 Star & above</label>
        <br />
      </div>

      <div className="sort-by mt-4 text-start">
        <h3>Sort By</h3>
        <input
          type="radio"
          name="sorting"
          value="LowToHigh"
          className="me-2"
          id="lowToHigh"
          onClick={(e) => sortHandler(e.target.value)}
        />{" "}
        <label htmlFor="lowToHigh">Price - Low To High</label>
        <br />
        <input
          type="radio"
          name="sorting"
          value="HighToLow"
          className="me-2"
          id="HighToLow"
          onClick={(e) => sortHandler(e.target.value)}
        />{" "}
        <label htmlFor="HighToLow">Price - High To Low</label>
        <br />
      </div>
    </form>
  );
}
