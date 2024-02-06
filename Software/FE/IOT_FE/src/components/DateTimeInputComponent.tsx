import React, { ChangeEvent, useState } from "react";

function DateTimeInput() {
  const [datetime, setDatetime] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatetime(event.target.value);
  };

  return (
    <div>
      <label>
        Chọn ngày và thời gian:
        <input type="datetime-local" value={datetime} onChange={handleChange} />
      </label>
    </div>
  );
}

export default DateTimeInput;
