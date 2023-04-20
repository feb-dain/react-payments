import { useFocus } from "hooks/useFocus";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { changeToValidValue } from "utils/inputValidator";
import { HIDDEN_ELEMENT_STYLE } from "constants/style";

interface CardNumber {
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
          length: 4,
          regex: /[^\d]/g,
        }),
      };
    });

    moveFocus(target, 4);
  };

  return (
    <>
      <label className="label-text" htmlFor="card-label">
        카드 번호
      </label>
      <S.InputBox>
        <S.Input
          type="text"
          name="number1"
          id="card-label"
          aria-labelledby="card-label"
          maxLength={4}
          inputMode="numeric"
          value={cardNumber.number1}
          ref={(el) => handleRef(el, 0)}
          onChange={handleCardNumber}
          placeholder="0000"
          autoFocus
          required
        />
        <S.Hyphen cardNumber={cardNumber.number1}>-</S.Hyphen>
        <S.Input
          type="text"
          name="number2"
          aria-labelledby="card-label"
          maxLength={4}
          inputMode="numeric"
          value={cardNumber.number2}
          ref={(el) => handleRef(el, 1)}
          onChange={handleCardNumber}
          placeholder="0000"
          required
        />
        <S.Hyphen cardNumber={cardNumber.number2}>-</S.Hyphen>
        <S.Input
          type="password"
          name="number3"
          aria-labelledby="card-label"
          maxLength={4}
          inputMode="numeric"
          value={cardNumber.number3}
          ref={(el) => handleRef(el, 2)}
          onChange={handleCardNumber}
          placeholder="0000"
          required
        />
        <S.Hyphen cardNumber={cardNumber.number3}>-</S.Hyphen>
        <S.Input
          type="password"
          name="number4"
          aria-labelledby="card-label"
          maxLength={4}
          inputMode="numeric"
          value={cardNumber.number4}
          ref={(el) => handleRef(el, 3)}
          onChange={handleCardNumber}
          placeholder="0000"
          required
        />
      </S.InputBox>
      <S.Caption cardNumbers={Object.values(cardNumber)}>
        숫자 16자리를 모두 입력해 주세요.
      </S.Caption>
    </>
  );
};

const S = {
  InputBox: styled.div`
    display: flex;
    justify-content: center;
    width: 88vw;
    height: 48px;
    margin-top: 12px;
    background: var(--input-background);
    border-radius: 8px;
  `,

  Input: styled.input`
    background: var(--input-background);
    width: 14vw;
    margin: 0 2.2vw;
    font-size: 14px;
    text-align: center;
    letter-spacing: 1px;
  `,

  Hyphen: styled.p<{ cardNumber: string }>`
    font-weight: 900;
    align-self: center;
    visibility: ${({ cardNumber }) =>
      cardNumber.length !== 4 && `${HIDDEN_ELEMENT_STYLE}`};
  `,

  Caption: styled.p<{ cardNumbers: string[] }>`
    color: var(--caption-color);
    font-size: 12px;
    margin: 8px 0 16px 4px;
    visibility: ${({ cardNumbers }) =>
      cardNumbers.join("").length === 16 && `${HIDDEN_ELEMENT_STYLE}`};
  `,
};

export default CardNumberInput;