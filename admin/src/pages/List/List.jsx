/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'; // Added import for PropTypes

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = useCallback(async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error('Error');
    }
  }, [url]); // Wrapped fetchList in useCallback and added url as dependency

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error('Error');
    }
  };

  useEffect(() => {
    fetchList(); // Added fetchList to dependency array
  }, [fetchList]);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => {
          return (
            <div key={item._id} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

List.propTypes = {
  url: PropTypes.string.isRequired, // Added prop validation
};

export default List;