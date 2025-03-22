import React, { useEffect, useState, useCallback } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import "../styles/PieChartComponent.scss";
import CustomTooltip from "../components/CustomTooltip";

const COLORS = ["#4318FF", "#6AD2FF", "#287e7b"];

const getFilteredData = (data, period) => {
  if (!data || !Array.isArray(data)) return [];

  return data.map(item => ({
    ...item,
    value:
      period === "day"
        ? item.value < 30
          ? item.value
          : Math.round(item.value / 30)
        : item.value,
  }));
};

// Оптимизированная функция для рендера меток на диаграмме
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, windowWidth }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
  const fontSize = windowWidth <= 600 ? 10 : 12;

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={fontSize}>
      {windowWidth > 1000 ? value : `${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Оптимизированный рендер легенды
const renderCustomizedLegend = ({ payload }) => (
  <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
    {payload.map((entry, index) => (
      <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: entry.color,
            marginRight: "8px",
          }}
        />
        <span className="entry-text" style={{ '--entry-color': entry.color }}>{entry.value}</span>
      </li>
    ))}
  </ul>
);

const PieChartComponent = ({ period }) => {
  const [pieChartData, setPieChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Функция для обновления ширины окна
  const updateWindowSize = useCallback(() => setWindowWidth(window.innerWidth), []);

  useEffect(() => {
    fetch("/fakeData.json")
      .then(response => response.json())
      .then(data => {
        setPieChartData(data.pieChartData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Ошибка загрузки данных:", error);
        setIsLoading(false);
      });

    // Добавляем обработчик изменения размеров окна
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, [updateWindowSize]);

  if (isLoading) return <p>Загрузка данных...</p>;
  if (!pieChartData || !pieChartData[period]) return <p>Нет данных для отображения</p>;

  const filteredData = getFilteredData(pieChartData[period], period);

  return (
    <div className="pie-chart">
      <div className="pie-chart__container">
        <ResponsiveContainer width="100%" height={windowWidth <= 600 ? 300 : 400}>
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={windowWidth <= 600 ? 80 : 100}
              label={(props) => renderCustomizedLabel({ ...props, windowWidth })}
              labelLine={false}
            >
              {filteredData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderCustomizedLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;
