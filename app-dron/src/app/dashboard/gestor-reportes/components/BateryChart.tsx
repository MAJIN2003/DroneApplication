// src/ArcChart.tsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ArcChartProps {
  batteryLevel: number;
  width: number;
}

const BateryChart: React.FC<ArcChartProps> = ({ batteryLevel=0, width }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const height = Math.min(500, width / 2);
    const outerRadius = height / 2 - 10;
    const innerRadius = outerRadius * 0.75;
    const tau = 2 * Math.PI;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0);

    const background = g
      .append("path")
      .datum({ innerRadius, outerRadius, startAngle: 0, endAngle: tau })
      .style("fill", "#ddd")
      .attr("d", arc);

    const foreground = g
      .append("path")
      .datum({
        innerRadius,
        outerRadius,
        startAngle: 0,
        endAngle: (batteryLevel / 100) * tau,
      })
      .style("fill", "orange")
      .attr("d", arc);

    // Agrega el texto al centro del gráfico
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text(`${!batteryLevel ? 0.0 : batteryLevel.toFixed(2)}%`);

    return () => {
      svg.selectAll("*").remove();
    };
  }, [batteryLevel, width]);

  return <svg ref={svgRef}></svg>;
};

export default BateryChart;
