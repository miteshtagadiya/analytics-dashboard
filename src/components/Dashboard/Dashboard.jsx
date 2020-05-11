import React, { useState, useEffect } from "react";
import CommonChart from "../CommonChart/CommonChart";
import Title from "../Title/Title";
import Loader from "../Loader/Loader";
import DataTable from "react-data-table-component";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch(
      "https://raw.githubusercontent.com/anadahalli/interview/master/db.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          setLoader(false);
        },
        (_error) => {
          setData({});
          setLoader(false);
        }
      );
  }, []);

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      let date = new Date(currentValue[key]);
      date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
      (result[date] = result[date] || []).push(currentValue);
      return result;
    }, {});
  };

  let groupbyDate =
    Object.keys(data).length > 0 ? groupBy(data.orders, "created") : {};
  let chartData =
    Object.keys(data).length > 0
      ? Object.keys(groupbyDate).map((order) => {
          let orders = groupbyDate[order].length;
          let price = 0;
          groupbyDate[order].map((item) => (price += +item.price));
          return { name: order, Orders: orders, Price: price };
        })
      : [];

  let columnList = [
    "id",
    "firstName",
    "lastName",
    "email",
    "created",
    "orders",
  ];

  let columns = columnList.map((column) => {
    return {
      name: column.charAt(0).toUpperCase() + column.slice(1),
      selector: column,
      sortable: true,
    };
  });

  return (
    <div className="container">
      <div className="jumbotron">
        <h3>Analytics Dashboard</h3>
      </div>
      <div className="row">
        <div className="col-sm-12 col-lg-6">
          <div className="card p-4">
            <Title title="Orders Counts by date" />
            {loader ? (
              <Loader />
            ) : (
              <CommonChart
                grid={false}
                chart={"BarChart"}
                data={chartData}
                labels={["Orders"]}
                colors={["#192a56"]}
              />
            )}
          </div>
        </div>
        <div className="col-sm-12 col-lg-6">
          <div className="card p-4">
            <Title title="Total Price by date" />
            {loader ? (
              <Loader />
            ) : (
              <CommonChart
                grid={false}
                chart={"LineChart"}
                data={chartData}
                labels={["Price"]}
                colors={["#192a56"]}
              />
            )}
          </div>
        </div>
        <div className="col-sm-12" style={{ margin: "30px 0px" }}>
          <div className="card p-4">
            <Title title="Customers" />
            {loader ? (
              <Loader />
            ) : (
              <DataTable
                data={data.customers}
                pagination
                highlightOnHover
                columns={columns}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
