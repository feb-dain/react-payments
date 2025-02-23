import { useContext } from "react";
import { CardInfoContext } from "components/provider/CardInfoProvider";

const useInitCardInfo = () => {
  const cardInfo = useContext(CardInfoContext).cardInfo;
  const setCardInfo = useContext(CardInfoContext).setCardInfo;

  const initCardInfo = (key: string, info: string) => {
    setCardInfo((prevState) => {
      return {
        ...prevState,
        [key]: info,
      };
    });
  };

  return { cardInfo, initCardInfo };
};

export default useInitCardInfo;
