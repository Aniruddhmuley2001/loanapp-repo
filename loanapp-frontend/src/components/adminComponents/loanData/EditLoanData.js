import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export default function EditLoanData() {
    let params = useParams();
    const getLoanBaseURL = "http://localhost:7000/fetchLoanDetails/" + params.loanId;
    const updateLoanBaseURL = "http://localhost:7000/updateLoan";

    const navigate = useNavigate();
    const adminId = sessionStorage.getItem("emp_id");

    const [loanId, setLoanId] = useState("")
    const [loanType, setLoanType] = useState("")
    const [loanDuration, setLoanDuration] = useState("")

    const setLoanData = () => {
        axios.get(getLoanBaseURL ).then((response) => {
          let loan = response.data;
          setLoanId(loan.loanId);
          setLoanType(loan.loanType);
          setLoanDuration(loan.loanDuration);
        }).catch(error => {
          alert("Error Ocurred while loading loan data:" + error);
        });
    }

    const loanIdChangeHandler = (event) => {
        setLoanId(event.target.value);
    }

    const loanTypeChangeHandler = (event) => {
        setLoanType(event.target.value);
    }

    const loanDurationChangeHandler = (event) => {
        setLoanDuration(event.target.value);
    }

    useEffect(() => {
        setLoanData();
      }, []);

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
          .put(updateLoanBaseURL, {
            loanId: loanId,
            loanType: loanType,
            loanDuration: loanDuration,
          })
          .then((response) => {
            alert("Loan "+ loanId +" added!");
            navigate("/admin/" + adminId + "/loans");
          }).catch(error => {
            alert("error==="+error);
          });
    
      };

    return (
        <>
        <form onSubmit={submitActionHandler}>
            <p>
            <label>Loan Id: <input type="text" value={loanId} disabled onChange={loanIdChangeHandler}></input></label>
            </p>

            <p>
            <label>Loan Type: <input type="text" value={loanType} disabled onChange={loanTypeChangeHandler}></input></label>
            </p>

            <p>
            <label>Loan Duration: <input type="number" value={loanDuration} onChange={loanDurationChangeHandler}></input></label>
            </p>

            <button type="submit">Submit</button>
        </form>
        </>
    )
}
