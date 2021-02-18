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

const Chart = ({ dataZoomedOut, dataZoomedIn, field, title, label, max, maxZoom }) => {

  const getSeries = (data, timeFormat) => {
    return new TimeSeries({
      name: "events_daily",
      columns: ["index", "value"],
      points: data.map(v => [
        Index.getIndexString(timeFormat, new Date(v.date)),
        v[field].toString()
      ])
    });
  }

  const [highlight, setHighlight] = useState();
  const [zoomed, setZoomed] = useState(false);
  const [series, setSeries] = useState(getSeries(dataZoomedOut, "1d"));
  const [timeRange, setTimeRange] = useState(series.range());
  const style = styler([{ key: "value", color: "#D6D6D6", highlight: '#A3A3A3' }]);

  let infoValues = [];
  if(highlight)
    infoValues = [{label, value: highlight.event.get(highlight.column)}];

  const handleTimeRangeChanged = (t) => {
    if(t.duration() < 1000 * 60 * 60 * 24 * 5 && !zoomed){
      setZoomed(true);
      setSeries(getSeries(dataZoomedIn, "1h"));
    }
    else if(t.duration() >= 1000 * 60 * 60 * 24 * 5 && zoomed){
      setZoomed(false);
      setSeries(getSeries(dataZoomedOut, "1d"));
    }
    
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
          title={title}
          enablePanZoom={true}
          onTimeRangeChanged={handleTimeRangeChanged}
        >
          <ChartRow height="300">
            <YAxis
              id={"id_" + field}
              label={"Number of" + label}
              min={0}
              max={zoomed ? maxZoom : max}
              width="70"
              type="linear"
            />
            <Charts>
              <BarChart
                axis={"id_" + field}
                style={style}
                columns={["value"]}
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
