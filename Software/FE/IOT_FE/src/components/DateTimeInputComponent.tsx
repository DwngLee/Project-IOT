import React, { ChangeEvent, useState } from "react";

interface DateTimeInputProps {
  onDatesChange: (start: string, end: string) => void;
  startDate: string;
  endDate: string;
}

function DateTimeInput({
  onDatesChange,
  startDate,
  endDate,
}: DateTimeInputProps) {
  const [startDatetime, setStartDatetime] = useState<string>(startDate);
  const [endDatetime, setEndDatetime] = useState<string>(endDate);

  const handleStartChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDatetime(event.target.value);
  };

  const handleEndChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDatetime(event.target.value);
  };

  const handleClick = () => {
    onDatesChange(startDatetime, endDatetime);
  };

  return (
    <div className="row align-items-center justify-content-end">
      <label className="me-4 col-auto">
        Start Date
        <input
          type="datetime-local"
          value={startDatetime}
          onChange={handleStartChange}
          className="ms-2"
        />
      </label>
      <label className="me-4 col-auto">
        End Date
        <input
          type="datetime-local"
          value={endDatetime}
          onChange={handleEndChange}
          className="ms-2"
        />
      </label>

      <button
        onClick={handleClick}
        type="button"
        className="btn btn-primary col-auto"
      >
        Apply Filter
      </button>
    </div>
  );
}

export default DateTimeInput;
