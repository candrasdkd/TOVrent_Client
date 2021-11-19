import React from "react";

export default function CounterButton({
  onClickRemove,
  value,
  onClickAdd,
  disabled,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center flex-row reserve-amount">
      <button disabled={disabled} className="rmv-btn" onClick={onClickRemove}>
        -
      </button>
      <div className="amount-added">{value}</div>

      <button disabled={disabled} className="add-btn" onClick={onClickAdd}>
        +
      </button>
    </div>
  );
}
