import { useFocus } from "hooks/useFocus";
import { ChangeEvent, Fragment, useContext } from "react";
import { changeInvalidValueToBlank } from "utils/inputValidator";
import styled from "styled-components";
import Input, { CommonInputStyle } from "components/Input";
import { Hyphen } from "components/DelimiterStyle";
import { CardNumberCaption } from "components/CaptionStyle";
import { CardNumberInputBox } from "components/InputBoxStyle";
import { CardNumber } from "types";
import { NUMBER_INPUT, LIMIT_LENGTH, VALID_INPUT } from "constants/limit";
import { CardInfoContext } from "components/CardInfoProvider";
const { ONLY_NUMBER } = VALID_INPUT;

const CardNumberInput = () => {
  const { number1, number2, number3, number4 } =
    useContext(CardInfoContext).cardInfo;
  const cardNumber: CardNumber = { number1, number2, number3, number4 };
  const setCardNumber = useContext(CardInfoContext).setCardInfo;

  const { handleRef, moveFocus } = useFocus();

  const handleCardNumberChange = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    setCardNumber((prevState) => {
      return {
        ...prevState,
        [target.name]: changeInvalidValueToBlank(target.value, {
          length: LIMIT_LENGTH.CARD_NUMBER,
          regex: ONLY_NUMBER,
        }),
      };
    });

    moveFocus(target, LIMIT_LENGTH.CARD_NUMBER);
  };

  return (
    <>
      <S.Label className="label-text" htmlFor="card-label">
        카드 번호
      </S.Label>
      <CardNumberInputBox>
        {Array.from({ length: NUMBER_INPUT.COUNT }).map((_, index) => (
          <Fragment key={index}>
            <Input
              type="text"
              name={`number${index + 1}`}
              id={index ? undefined : "card-label"}
              aria-labelledby="card-label"
              maxLength={LIMIT_LENGTH.CARD_NUMBER}
              inputMode="numeric"
              value={cardNumber[`number${index + 1}`]}
              placeholder="0000"
              required
              inputStyle={CommonInputStyle}
              onChange={handleCardNumberChange}
              ref={(el) => handleRef(el, index)}
            />
            {index === NUMBER_INPUT.LAST_PART ? (
              ""
            ) : (
              <Hyphen cardNumber={cardNumber[`number${index + 1}`]}>-</Hyphen>
            )}
          </Fragment>
        ))}
      </CardNumberInputBox>
      <CardNumberCaption cardNumbers={Object.values(cardNumber)}>
        숫자 {LIMIT_LENGTH.ALL_CARD_NUMBERS}자리를 모두 입력해 주세요.
      </CardNumberCaption>
    </>
  );
};

const S = {
  Label: styled.label`
    display: inline-block;
    margin-top: 26px;
  `,
};

export default CardNumberInput;
