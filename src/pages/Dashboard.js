import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { getApi, putApi } from "../apis/api";

const Dashboard = () => {
  const [userDetailData, setuserDetailData] = useState({});
  const [chargeCustomers, setChargeCustomers] = useState(
    userDetailData.charge_customers
  );
  const [customSongAmount, setCustomSongAmount] = useState(
    userDetailData.amount?.category_6 || ""
  );
  const [category7Amount, setCategory7Amount] = useState(
    userDetailData.amount?.category_7 || ""
  );
  const [category8Amount, setCategory8Amount] = useState(
    userDetailData.amount?.category_8 || ""
  );
  const [category9Amount, setCategory9Amount] = useState(
    userDetailData.amount?.category_9 || ""
  );
  const [category10Amount, setCategory10Amount] = useState(
    userDetailData.amount?.category_10 || ""
  );
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const isSaveButtonEnabled = () => {
    const minValueArray = [99, 79, 59, 39, 19];
    const enteredValues = [
      Number(customSongAmount),
      Number(category7Amount),
      Number(category8Amount),
      Number(category9Amount),
      Number(category10Amount),
    ];

    return enteredValues.every((value, index) => value >= minValueArray[index]);
  };

  const updateChart = () => {
    createBarChart();
  };

  const handleCustomSongChange = (e) => {
    setCustomSongAmount(e.target.value);
    updateChart();
  };

  const handleCategoryAmountChange = (e, category) => {
    switch (category) {
      case "category_7":
        setCategory7Amount(e.target.value);
        break;
      case "category_8":
        setCategory8Amount(e.target.value);
        break;
      case "category_9":
        setCategory9Amount(e.target.value);
        break;
      case "category_10":
        setCategory10Amount(e.target.value);
        break;
      default:
        break;
    }
    updateChart();
  };
  const handleChargeChange = (e) => {
    const value = e.target.id === "chargeyes";
    setChargeCustomers(value);
    updateChart();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      charge_customers: chargeCustomers,
      amount: {
        category_6: Number(customSongAmount),
        category_7: Number(category7Amount),
        category_8: Number(category8Amount),
        category_9: Number(category9Amount),
        category_10: Number(category10Amount),
      },
    };

    try {
      const putResponse = await fetch(putApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const putData = await putResponse.json();
      if (putData.status === 200) {
        console.log("Prices updated successfully:", putData.data.amount);
        setuserDetailData((prevData) => ({
          ...prevData,
          charge_customers: putData.data.charge_customers,
          amount: putData.data.amount,
        }));

        setChargeCustomers(putData.data.charge_customers);
        setCustomSongAmount(putData.data.amount.category_6 || "");
        setCategory7Amount(putData.data.amount.category_7 || "");
        setCategory8Amount(putData.data.amount.category_8 || "");
        setCategory9Amount(putData.data.amount.category_9 || "");
        setCategory10Amount(putData.data.amount.category_10 || "");
        createBarChart();
      } else {
        console.error("Failed to update prices:", putData.ui_err_msg);
      }
    } catch (error) {
      console.error("Error in PUT request:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getApi);
        const data = await res.json();
        console.log("Fetched data:", data.data);

        setuserDetailData(data.data);
        setChargeCustomers(data.data.charge_customers);
        setCustomSongAmount(data.data.amount?.category_6);
        setCategory7Amount(data.data.amount?.category_7);
        setCategory8Amount(data.data.amount?.category_8);
        setCategory9Amount(data.data.amount?.category_9);
        setCategory10Amount(data.data.amount?.category_10);
        createBarChart();
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    createBarChart();
  }, [
    customSongAmount,
    category7Amount,
    category8Amount,
    category9Amount,
    category10Amount,
  ]);

  // ... (remaining component code)
  const createBarChart = () => {
    const chartData = {
      labels: [
        "Custom Song",
        "Category 7",
        "Category 8",
        "Category 9",
        "Category 10",
      ],
      datasets: [
        {
          label: "Song Amounts",
          data: [
            customSongAmount,
            category7Amount,
            category8Amount,
            category9Amount,
            category10Amount,
          ],
          backgroundColor: [
            "rgb(240,195,241)",
            "rgb(240,195,241)",
            "rgb(240,195,241)",
            "rgb(240,195,241)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const chartConfig = {
      type: "bar",
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, chartConfig);
    }
  };

  const handleCategoryBlur = (value, minValue) => {
    if (value < minValue) {
      alert(`Invalid input! Value  is smaller than ${minValue}.`);
    }
  };
  return (
    <div className="Dashboard-section">
      <h1>
        {userDetailData.name} {userDetailData.location} on Dhun Jam
      </h1>
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <div className="box box1">
          <p>Charge your customer for requesting songs</p>
          <div className="radio_box">
            <div>
              <input
                type="radio"
                id="chargeyes"
                checked={chargeCustomers}
                onChange={handleChargeChange}
              />
              <label htmlFor="chargeyes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="chargeno"
                checked={!chargeCustomers}
                onChange={handleChargeChange}
              />
              <label htmlFor="chargeno">No</label>
            </div>
          </div>
        </div>

        <>
          <div className="box box2">
            <p>Amount for custom song request</p>
            <input
              type="number"
              id="custom-song-amount"
              value={customSongAmount}
              onChange={handleCustomSongChange}
              onBlur={() => handleCategoryBlur(Number(customSongAmount), 99)}
              disabled={!chargeCustomers}
            />
          </div>
          <div className="box box3_input">
            <p>Regular song request amounts, from high to low-</p>
            <div className="dashboard-inputbox">
              <input
                type="number"
                id="category7-amount"
                value={category7Amount}
                onChange={(e) => handleCategoryAmountChange(e, "category_7")}
                onBlur={() => handleCategoryBlur(Number(category7Amount), 79)}
                disabled={!chargeCustomers}
              />
              <input
                type="number"
                id="category8-amount"
                value={category8Amount}
                onChange={(e) => handleCategoryAmountChange(e, "category_8")}
                onBlur={() => handleCategoryBlur(Number(category8Amount), 59)}
                disabled={!chargeCustomers}
              />
              <input
                type="number"
                id="category9-amount"
                value={category9Amount}
                onChange={(e) => handleCategoryAmountChange(e, "category_9")}
                onBlur={() => handleCategoryBlur(Number(category9Amount), 39)}
                disabled={!chargeCustomers}
              />
              <input
                type="number"
                id="category10-amount"
                value={category10Amount}
                onChange={(e) => handleCategoryAmountChange(e, "category_10")}
                onBlur={() => handleCategoryBlur(Number(category10Amount), 19)}
                disabled={!chargeCustomers}
              />
            </div>
          </div>
          {chargeCustomers ? (
            <div className="box box4">
              <canvas ref={chartRef}></canvas>
            </div>
          ) : (
            ""
          )}
        </>

        <button
          className="save-button"
          type="submit"
          disabled={!isSaveButtonEnabled() || !chargeCustomers}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
