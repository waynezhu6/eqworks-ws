import React, { useState } from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, BarChart, styler } from "react-timeseries-charts";
import { TimeSeries, Index, sum, filter } from "pondjs";
import moment from 'moment';
import Resizable from 'react-timeseries-charts/lib/components/Resizable';
import styles from '../styles/components/Chart.module.scss';

const Chart = ({ data }) => {

  const getSeries = (subdata, timeFormat) => {
    return new TimeSeries({
      name: "events_daily",
      columns: ["index", "events"],
      points: subdata.map(v => [
        Index.getIndexString(timeFormat, new Date(v.date)),
        v.events.toString()
      ])
    });
  }

  const [highlight, setHighlight] = useState();
  const [zoomed, setZoomed] = useState(false);
  const [series, setSeries] = useState(getSeries(data.events_daily, "1d"));
  const [timeRange, setTimeRange] = useState(series.range());
  const style = styler([{ key: "events", color: "#D6D6D6", highlight: '#A3A3A3' }]);

  let infoValues = [];
  if(highlight)
    infoValues = [{label: "Events", value: highlight.event.get(highlight.column)}];

  const handleTimeRangeChanged = (t) => {
    if(t.duration() < 1000 * 60 * 60 * 24 * 4 && !zoomed){
      setZoomed(true);
      setSeries(getSeries(data.events_hourly, "1h"));
    }
    else if(t.duration() >= 1000 * 60 * 60 * 24 * 4 && zoomed){
      setZoomed(false);
      setSeries(getSeries(data.events_daily, "1d"));
    }
    else
      setTimeRange(t);
  }

  //const ticks = zoomed ? data.events_hourly.length : data.events_daily.length;
  //console.log(series);
  // const agr = series.fixedWindowRollup({
  //   windowSize: "4h",
  //   aggregation: {events: {events: sum(filter.ignoreMissing)}}
  // });

  return(
    <div className={styles.body}>
      <Resizable>
        <ChartContainer 
          utc={true}
          timeAxisTickCount={6}
          timeRange={timeRange}
          // format={(d) => moment(d).format("MMM Do")}
          title="Events by Day"
          enablePanZoom={true}
          onTimeRangeChanged={handleTimeRangeChanged}
        >
          <ChartRow height="300">
            <YAxis
              id="events_daily"
              label="Number of Events"
              min={0}
              max={50}
              width="70"
              type="linear"
            />
            <Charts>
              <BarChart
                axis="events_daily"
                style={style}
                //spacing={1}
                columns={["events"]}
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

export default Chart;
