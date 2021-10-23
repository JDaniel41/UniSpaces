import React, { useEffect } from "react";

import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

// Makes sure that response data is the trended part of the response.
function renderBarChart(responseData) {
    return (
        <BarChart
            width={500}
            height={300}
            data={responseData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="freq" fill="#8884d8" />
        </BarChart>
    );
}

export default function Trends() {
    return <h2>Test</h2>;
}
