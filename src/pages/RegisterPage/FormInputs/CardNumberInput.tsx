import { useFocus } from "hooks/useFocus";
import { ChangeEvent, Dispatch, SetStateAction, Fragment } from "react";
import styled from "styled-components";
import { changeToValidValue } from "utils/inputValidator";
import { HIDDEN_ELEMENT_STYLE } from "constants/style";
import { LIMIT_LENGTH, VALID_INPUT } from "constants/limit";
import Input from "components/Input";
const { ONLY_NUMBER } = VALID_INPUT;

interface CardNumber {
  [key: string]: string;
  number1: string;
  number2: string;
  number3: string;
  number4: string;
}

interface Props {
  cardNumber: CardNumber;
  setCardNumber: Dispatch<SetStateAction<CardNumber>>;
}

const CardNumberInput = ({ cardNumber, setCardNumber }: Props) => {
  const { handleRef, moveFocus } = useFocus();

  const handleCardNumber = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCardNumber((prevState) => {
      return {
        ...prevState,
        [target.name]: changeToValidValue(target.value, {
          length: LIMIT_LENGTH.CARD_NUMBER,
          regex: ONLY_NUMBER,
        }),
      };
    });

    moveFocus(target, LIMIT_LENGTH.CARD_NUMBER);
  };

  const inputsCount = 4;
  const lastInput = inputsCount - 1;

  return (
    <>
      <S.Label className="label-text" htmlFor="card-label">
        카드 번호
      </S.Label>
      <S.InputBox>
        {Array.from({ length: inputsCount }).map((_, index) => (
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
              autoFocus={index ? false : true}
              required
              onChange={handleCardNumber}
              ref={(el) => handleRef(el, index)}
            />
            {index === lastInput ? (
              ""
            ) : (
              <S.Hyphen cardNumber={cardNumber[`number${index + 1}`]}>
                -
              </S.Hyphen>
            )}
          </Fragment>
        ))}
      </S.InputBox>
      <S.Caption cardNumbers={Object.values(cardNumber)}>
        숫자 {LIMIT_LENGTH.ALL_CARD_NUMBERS}자리를 모두 입력해 주세요.
      </S.Caption>
    </>
  );
};

const S = {
  Label: styled.label`
    display: inline-block;
    margin-top: 26px;
  `,

  InputBox: styled.div`
    display: flex;
    justify-content: center;
    width: 88vw;
    height: 48px;
    margin-top: 12px;
    background: var(--input-background);
    border-radius: 8px;
  `,

  Hyphen: styled.p<{ cardNumber: string }>`
    font-weight: 900;
    align-self: center;
    visibility: ${({ cardNumber }) =>
      cardNumber.length !== LIMIT_LENGTH.CARD_NUMBER &&
      `${HIDDEN_ELEMENT_STYLE}`};
  `,

  Caption: styled.p<{ cardNumbers: string[] }>`
    color: var(--caption-color);
    font-size: 12px;
    margin: 8px 0 16px 4px;
    visibility: ${({ cardNumbers }) =>
      cardNumbers.join("").length === LIMIT_LENGTH.ALL_CARD_NUMBERS &&
      `${HIDDEN_ELEMENT_STYLE}`};
  `,
};

export default CardNumberInput;