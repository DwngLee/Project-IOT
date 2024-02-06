import React, { ChangeEvent, useState } from "react";

interface DateTimeInputProps {
  onDatesChange: (start: string, end: string) => void;
}

function DateTimeInput({ onDatesChange }: DateTimeInputProps) {
  const [startDatetime, setStartDatetime] = useState<string>("");
  const [endDatetime, setEndDatetime] = useState<string>("");

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
        <input type="date" value={startDatetime} onChange={handleStartChange} />
      </label>
      <label>
        Chọn ngày và thời gian kết thúc:
        <input type="date" value={endDatetime} onChange={handleEndChange} />
      </label>
      {/* Truyền hàm handleClick vào onClick */}
      <button onClick={handleClick}>Xác nhận</button>
    </div>
  );
}

export default DateTimeInput;
