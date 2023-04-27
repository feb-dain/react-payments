import { useEffect, useState } from "react";
import { isValidInfo } from "validation";

const useRequiredCardInfo = (requiredCardInfo: {}) => {
  const areAllInputsFilled = isValidInfo(requiredCardInfo);

  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect(() => {
    setIsFormFilled(areAllInputsFilled);
  }, [areAllInputsFilled]);

  return { isFormFilled };
};

export default useRequiredCardInfo;