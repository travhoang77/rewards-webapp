import React, { useState, useEffect } from "react";

const months = [
  {
    name: "October",
    startDate: "2022-10-01",
    endDate: "2022-10-31",
  },
  {
    name: "November",
    startDate: "2022-11-01",
    endDate: "2022-11-30",
  },
  {
    name: "December",
    startDate: "2022-12-01",
    endDate: "2022-12-31",
  },
];

function Rewards(props) {
  const [rewardsData, setRewardsData] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Fetch rewards data for each month
    async function fetchRewardsData() {
      const rewardsForMonths = {};

      let totalRewards = 0; // Initialize total rewards

      for (const month of months) {
        const apiUrl = ` const customersUrl = "http://localhost:5000/api/customers/transactions/rewards?customer_id=${props.object.id}&start_date=${month.startDate}&end_date=${month.endDate}`;

        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          const rewards = data.rewards;
          rewardsForMonths[month.name] = rewards;
          totalRewards += rewards; // Accumulate rewards for total
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      setRewardsData(rewardsForMonths);
      setTotal(totalRewards); // Set the total rewards
    }

    fetchRewardsData();
  }, [props.object.id]);

  return (
    <>
      <div>
        <h1>
          {props.object.firstname} {props.object.lastname}
        </h1>
        <table className="styled-table">
          <thead>
            <tr>
              {months.map((month) => (
                <th key={month.name}>{month.name}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {months.map((month) => (
                <td key={month.name}>{rewardsData[month.name]}</td>
              ))}
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Rewards;