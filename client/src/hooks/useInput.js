import { useState, useCallback } from "react";

const SetTargetValue = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handler];
};

export default SetTargetValue;
