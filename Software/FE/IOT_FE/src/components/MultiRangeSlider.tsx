import React, { useCallback, useEffect, useState, useRef } from "react";
import { Fragment } from "react";
import "../custom/multiRangeSlider.css";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  rangeLabel: string;
  onChange: (values: { min: number; max: number }) => void;
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  min,
  max,
  rangeLabel,
  onChange,
}) => {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const minValRef = useRef<number>(min);
  const maxValRef = useRef<number>(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    // Bạn chỉ cập nhật state của cha khi giá trị min hoặc max thực sự thay đổi
    if (minVal !== minValRef.current || maxVal !== maxValRef.current) {
      onChange({ min: minVal, max: maxVal });
      minValRef.current = minVal;
      maxValRef.current = maxVal;
    }
  }, [minVal, maxVal, onChange]);

  const handleMinChange = (value: number) => {
    const newValue = Math.min(value, maxVal - 1);
    setMinVal(newValue);
    onChange({ min: newValue, max: maxVal });
  };

  const handleMaxChange = (value: number) => {
    const newValue = Math.max(value, minVal + 1);
    setMaxVal(newValue);
    onChange({ min: minVal, max: newValue });
  };

  return (
    <Fragment>
      <p>{rangeLabel}</p>
      <div>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => handleMinChange(Number(event.target.value))}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => handleMaxChange(Number(event.target.value))}
          className="thumb thumb--right"
        />
        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value">
            <input
              disabled
              value={minVal}
              min={min}
              max={max}
              style={{ width: "40px", height: "25px", marginLeft: "-10px" }}
              onChange={(e) => handleMinChange(Number(e.target.value))}
            />
          </div>
          <div className="slider__right-value">
            <input
              disabled
              value={maxVal}
              min={min - 1}
              max={max}
              style={{ width: "40px", height: "25px", marginLeft: "-10px" }}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MultiRangeSlider;
