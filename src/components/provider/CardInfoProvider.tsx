import { useState } from "react";
import { INITIAL_CARD_INFO } from "constants/initialCardInfo";
import { createContext } from "react";
import { CardInfoState, ProviderChildren } from "types";

const CardInfoProvider = ({ children }: ProviderChildren) => {
  const [cardInfo, setCardInfo] = useState(INITIAL_CARD_INFO);

  return (
    <CardInfoContext.Provider
      value={{ cardInfo: cardInfo, setCardInfo: setCardInfo }}
    >
      {children}
    </CardInfoContext.Provider>
  );
};

export default CardInfoProvider;

export const CardInfoContext = createContext<CardInfoState>({
  cardInfo: INITIAL_CARD_INFO,
  setCardInfo: () => {},
});