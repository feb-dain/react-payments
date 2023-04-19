import { useFocus } from "hooks/useFocus";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { changeToValidValue } from "utils/inputValidator";
import { HIDDEN_ELEMENT_STYLE } from "constants/style";

const ExpirationDateInput = () => {
  const { handleRef, moveFocus } = useFocus();

  const [date, setDate] = useState({
    month: "",
    year: "",
  });

  const handleDate = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = Number(target.value);
    if ((target.name === "month" && value > 12) || value < 0) return "";

    setDate((prevState) => {
      return {
        ...prevState,
        [target.name]: changeToValidValue(target.value, {
          length: 2,
          regex: /[^\d]/g,
        }),
      };
    });

    moveFocus(target, 2);
  };

  return (
    <>
      <S.Label htmlFor="date-label">만료일</S.Label>
      <S.InputBox>
        <S.Input
          type="text"
          name="month"
          id="date-label"
          aria-labelledby="date-label"
          maxLength={2}
          inputMode="numeric"
          value={date.month}
          ref={(el) => handleRef(el, 0)}
          onChange={handleDate}
          placeholder="MM"
          required
        />
        <S.Hyphen month={date.month}>/</S.Hyphen>
        <S.Input
          type="text"
          name="year"
          aria-labelledby="date-label"
          maxLength={2}
          inputMode="numeric"
          value={date.year}
          ref={(el) => handleRef(el, 1)}
          onChange={handleDate}
          placeholder="YY"
          required
        />
      </S.InputBox>
      <S.Caption date={Object.values(date)}>
        카드에 표기된 월/연도 순으로 입력해주세요. ex&#41; 01/28
      </S.Caption>
    </>
  );
};

const S = {
  Label: styled.label`
    color: var(--label-color);
  `,

  InputBox: styled.div`
    display: flex;
    justify-content: center;
    width: 40vw;
    height: 48px;
    margin-top: 14px;
    background: var(--input-background);
    border-radius: 8px;
  `,

  Input: styled.input`
    background: var(--input-background);
    width: 12vw;
    margin: 0 2.2vw;
    text-align: center;
  `,

  Hyphen: styled.p<{ month: string }>`
    font-weight: 900;
    align-self: center;
    visibility: ${({ month: cardNumber }) =>
      cardNumber.length !== 2 && `${HIDDEN_ELEMENT_STYLE}`};
  `,

  Caption: styled.p<{ date: string[] }>`
    color: var(--caption-color);
    font-size: 12px;
    margin: 10px 0 20px 4px;
    visibility: ${({ date: cardNumbers }) =>
      cardNumbers.join("").length === 4 && `${HIDDEN_ELEMENT_STYLE}`};
  `,
};

export default ExpirationDateInput;
