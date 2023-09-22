import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export default function EditItemData() {
    let params = useParams();
    const getItemBaseURL = "http://localhost:7000/fetchItemDetails/" + params.itemId;
    const updateItemBaseURL = "http://localhost:7000/updateItem";

    const navigate = useNavigate();
    const adminId = sessionStorage.getItem("emp_id");

    const [itemId, setItemId] = useState("")
    const [itemStatus, setItemStatus] = useState("")
    const [itemDescription, setItemDescription] = useState("")
    const [itemMake, setItemMake] = useState("")
    const [itemCategory, setItemCategory] = useState("")
    const [itemValue, setItemValue] = useState("")

    const setItemData = () => {
        axios.get(getItemBaseURL ).then((response) => {
          let item = response.data;
          setItemId(item.itemId);
          setItemStatus(item.itemStatus);
          setItemDescription(item.itemDescription);
          setItemMake(item.itemMake);
          setItemCategory(item.itemCategory);
          setItemValue(item.itemValue);
        }).catch(error => {
          alert("Error Ocurred while loading items data:" + error);
        });
    }

    const itemIdChangeHandler = (event) => {
        setItemId(event.target.value);
    }

    const itemStatusChangeHandler = (event) => {
        setItemStatus(event.target.value);
    }

    const itemDescriptionChangeHandler = (event) => {
        setItemDescription(event.target.value);
    }

    const itemMakeChangeHandler = (event) => {
        setItemMake(event.target.value);
    }

    const itemValueChangeHandler = (event) => {
        setItemValue(event.target.value);
    }

    const itemCategoryChangeHandler = (event) => {
        setItemCategory(event.target.value);
    }

    useEffect(() => {
        setItemData();
      }, []);

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
          .put(updateItemBaseURL, {
            itemId: itemId,
            itemStatus: itemStatus,
            itemDescription: itemDescription,
            itemMake: itemMake,
            itemCategory: itemCategory,
            itemValue: itemValue
          })
          .then((response) => {
            alert("Item "+ itemId +" added!");
            navigate("/admin/" + adminId + "/items");
          }).catch(error => {
            alert("error==="+error);
          });
    
      };

    return (
        <>
        <form onSubmit={submitActionHandler}>
        <p>
            <label>Item Id: <input type="text" value={itemId} onChange={itemIdChangeHandler}></input></label>
            </p>

            <p>
            <label>Item Status: <input type="text" value={itemStatus} onChange={itemStatusChangeHandler}></input></label>
            </p>

            <p>
            <label>Item Category: <input type="text" value={itemCategory} onChange={itemCategoryChangeHandler}></input></label>
            </p>

            <p>
            <label>Item Make: <input type="text" value={itemMake} onChange={itemMakeChangeHandler}></input></label>
            </p>

            <p>
            <label>Item Description: <input type="text" value={itemDescription} onChange={itemDescriptionChangeHandler}></input></label>
            </p>

            <p>
            <label>Item Value: <input type="number" value={itemValue} onChange={itemValueChangeHandler}></input></label>
            </p>

            <button type="submit">Submit</button>
        </form>
        </>
    )
}
