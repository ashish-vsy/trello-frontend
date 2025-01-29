import React, { useState } from "react";

const DropIndicator = ({ beforeId, column }) => {
    return (
      <div
        data-before={beforeId || "-1"}
        data-column={column}
        className="my-0.5 h-0.5 w-full bg-pink-300 opacity-0"
      />
    );
  };

export default DropIndicator;