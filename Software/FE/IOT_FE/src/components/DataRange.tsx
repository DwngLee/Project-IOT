import MultiRangeSlider from "./MultiRangeSlider";
import { useState } from "react";

function DataRange() {
  const [temperature, setTemperature] = useState({ min: 0, max: 100 });
  const [humidity, setHumidity] = useState({ min: 0, max: 100 });
  const [light, setLight] = useState({ min: 0, max: 1000 });

  const handleFilterClick = () => {
    console.log("Temperature:", temperature);
    console.log("Humidity:", humidity);
    console.log("Light:", light);
  };

  return (
    <div className="vstack gap-3 container p-0">
      <div className="my-4">
        <MultiRangeSlider
          min={0}
          max={100}
          rangeLabel="Temperature"
          onChange={({ min, max }) => setTemperature({ min, max })}
        />
      </div>
      <div className="my-4">
        <MultiRangeSlider
          min={0}
          max={100}
          rangeLabel="Humidity"
          onChange={({ min, max }) => setHumidity({ min, max })}
        />
      </div>
      <div className="my-4">
        <MultiRangeSlider
          min={0}
          max={1000}
          rangeLabel="Light"
          onChange={({ min, max }) => setLight({ min, max })}
        />
      </div>
      <div className="text-center">
        <button onClick={handleFilterClick} className="btn btn-primary">
          Filter
        </button>
      </div>
    </div>
  );
}

export default DataRange;
