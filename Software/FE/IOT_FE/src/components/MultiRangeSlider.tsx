import React, { useState, useEffect, useRef, Fragment } from "react";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  label: string;
  onChange: (values: { min: number; max: number }) => void;
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  min,
  max,
  onChange,
  label,
}) => {
  const [values, setValues] = useState<{ min: number; max: number }>({
    min,
    max,
  });
  const range = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleChange();
  }, [values]);

  const handleChange = () => {
    onChange(values);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: Number(value),
    });
  };

  return (
    <Fragment>
      <p>{label}</p>

      <input
        type="range"
        min={min}
        max={max}
        value={values.min}
        onChange={handleInputChange}
        name="min"
        ref={range}
        className="thumb thumb--left"
        style={{ zIndex: values.min > max - 100 ? 5 : undefined }}
      />
      <div
        className="slider__track"
        style={{
          background: `linear-gradient(to right, #3880ff ${
            (values.min / max) * 100
          }%, #3880ff ${(values.max / max) * 100}%, #d1d1d1 ${
            (values.max / max) * 100
          }%, #d1d1d1 100%)`,
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={values.max}
        onChange={handleInputChange}
        name="max"
        className="thumb thumb--right"
        style={{ zIndex: values.max > max - 100 ? 5 : undefined }}
      />

      <div className="slider">
        <div className="slider__range" />
        <div className="slider__left-value">
          <input
            value={values.min}
            min={min}
            max={max}
            name="min"
            onChange={handleInputChange}
          />
        </div>
        <div className="slider__right-value">
          <input
            value={values.max}
            min={min}
            max={max}
            name="max"
            onChange={handleInputChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default MultiRangeSlider;
