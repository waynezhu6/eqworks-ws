import React, { useState } from 'react';
import { 
  Charts, 
  ChartContainer, 
  ChartRow, 
  YAxis, 
  BarChart, 
  styler, 
  Resizable 
} from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";
import moment from 'moment';
import styles from '../styles/components/Chart.module.scss';

const StatsChart = ({ data }) => {

  const getSeries = (data, timeFormat) => {

    return new TimeSeries({
      name: "revenue_daily",
      columns: ["index", "revenue"],
      points: data.map(v => [
        Index.getIndexString(timeFormat, new Date(v.date)),
        v.revenue
      ])
    });
  }

  const [highlight, setHighlight] = useState();
  const series = getSeries(data, "1d");
  const [timeRange, setTimeRange] = useState(series.range());
  const style = styler([{ key: "revenue", color: "#D6D6D6", highlight: '#A3A3A3' }]);

  let infoValues = [];
  if(highlight)
    infoValues = [{label: "Revenue", value: highlight.event.get(highlight.column)}];

  const handleTimeRangeChanged = (t) => {
    setTimeRange(t);
  }

  return(
    <div className={styles.body}>
      <Resizable>
        <ChartContainer 
          utc={true}
          timeAxisTickCount={6}
          timeRange={timeRange}
          // format={(d) => moment(d).format("MMM Do")}
          title="Daily Revenue"
          enablePanZoom={true}
          onTimeRangeChanged={handleTimeRangeChanged}
        >
          <ChartRow height="300">
            <YAxis
              id="revenue_daily"
              label="Number of Events"
              min={0}
              max={15000}
              width="70"
              type="linear"
            />
            <Charts>
              <BarChart
                axis="revenue_daily"
                style={style}
                spacing={1}
                columns={["revenue"]}
                series={series}
                highlighted={highlight}
                onHighlightChange={h => setHighlight(h)}
                info={infoValues}
                infoTimeFormat={index =>
                  moment(index.begin()).format("MMM Do 'YY")
                }
              />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    </div>
  );
}

export default StatsChart;
