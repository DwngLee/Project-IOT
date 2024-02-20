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
    <div>
      <label>
        Chọn ngày và thời gian bắt đầu:
        <input
          type="datetime-local"
          value={startDatetime}
          onChange={handleStartChange}
        />
      </label>
      <label>
        Chọn ngày và thời gian kết thúc:
        <input
          type="datetime-local"
          value={endDatetime}
          onChange={handleEndChange}
        />
      </label>
      {/* Truyền hàm handleClick vào onClick */}
      <button onClick={handleClick}>Xác nhận</button>
    </div>
  );
}

export default DateTimeInput;
