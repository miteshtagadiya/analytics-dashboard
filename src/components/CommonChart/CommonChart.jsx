import React from "react";
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./CommonChart.css";

const CommonChart = (props) => {
  const data = props.data === undefined ? [] : props.data;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            background: "white",
            padding: 15,
            borderRadius: 10,
            border: "1px solid grey",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#404b69",
            }}
          >
            {label}
          </p>
          {typeof payload !== "undefined" &&
            payload !== null &&
            payload.map((item, index) => {
              return (
                <div key={index}>
                  <span style={{ color: item.color, fontWeight: "bold" }}>
                    {item.name}:{" "}
                  </span>
                  <span style={{ color: item.color, fontWeight: "bold" }}>
                    {item.value}
                  </span>
                  <br />
                </div>
              );
            })}
        </div>
      );
    }

    return null;
  };

  let ChartName = (chart) => {
    switch (chart) {
      case "LineChart":
        return LineChart;
      case "BarChart":
        return BarChart;
      default:
        return LineChart;
    }
  };

  let selectChart = (chart) => {
    switch (chart) {
      case "LineChart":
        return Line;
      case "BarChart":
        return Bar;
      default:
        return Line;
    }
  };

  let Chart = selectChart(props.chart);
  let Type = ChartName(props.chart);
  return (
    <div
      className="container-CommonChart"
      style={props.height ? { height: props.height } : { height: 270 }}
    >
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <Type width={500} height={100} data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis hide={false} dataKey={props.axis ? props.axis : "name"} />

            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout={props.legendLayout ? props.legendLayout : "horizontal"}
              margin={{ top: 0, left: 0, right: 0, bottom: 10 }}
              verticalAlign={
                props.verticalAlign ? props.verticalAlign : "bottom"
              }
            />
            {props.labels &&
              props.labels.map((label, index) =>
                props.chart === "BarChart" ? (
                  <Chart
                    key={index}
                    stackId={"a"}
                    type="monotone"
                    dataKey={label}
                    stroke={props.colors[index]}
                    fill={props.colors[index]}
                  />
                ) : (
                  <Chart
                    key={index}
                    stackId={"a"}
                    type="monotone"
                    dataKey={label}
                    stroke={props.colors[index]}
                    activeDot={{ r: 8 }}
                    fill={props.colors[index]}
                    dot={false}
                  />
                )
              )}
          </Type>
        </ResponsiveContainer>
      ) : (
        <div className="no-data">No data</div>
      )}
    </div>
  );
};

export default CommonChart;
