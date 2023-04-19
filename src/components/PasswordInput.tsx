import { useFocus } from "hooks/useFocus";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { changeToValidValue } from "utils/inputValidator";
import { HIDDEN_ELEMENT_STYLE } from "constants/style";

const PasswordInput = () => {
  const { handleRef, moveFocus } = useFocus();

  const [password, setPassword] = useState({
    password1: "",
    password2: "",
  });

  const handlePassword = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setPassword((prevState) => {
      return {
        ...prevState,
        [target.name]: changeToValidValue(target.value, {
          length: 1,
          regex: /[^\d]/g,
        }),
      };
    });

    moveFocus(target, 1);
  };

  return (
    <>
      <label className="label-text" htmlFor="password-label">
        카드 비밀번호
      </label>
      <S.InputBox>
        <S.Input
          type="text"
          name="password1"
          id="password-label"
          aria-labelledby="password-label"
          maxLength={1}
          inputMode="numeric"
          value={password.password1}
          ref={(el) => handleRef(el, 0)}
          onChange={handlePassword}
          placeholder="0"
          required
        />
        <S.Input
          type="text"
          name="password2"
          aria-labelledby="password-label"
          maxLength={1}
          inputMode="numeric"
          value={password.password2}
          ref={(el) => handleRef(el, 1)}
          onChange={handlePassword}
          placeholder="0"
          required
        />
        <S.HiddenPassword>ㆍ</S.HiddenPassword>
        <S.HiddenPassword>ㆍ</S.HiddenPassword>
      </S.InputBox>
      <S.Caption password={Object.values(password)}>
        카드 비밀번호 앞 2자리를 입력해 주세요.
      </S.Caption>
    </>
  );
};

const S = {
  InputBox: styled.div`
    display: flex;
    height: 48px;
    margin-top: 12px;
  `,

  Input: styled.input`
    background: var(--input-background);
    width: 12vw;
    margin-right: 2.2vw;
    font-size: 14px;
    text-align: center;
    border-radius: 8px;
  `,

  HiddenPassword: styled.p`
    width: 12vw;
    margin-right: 2.2vw;
    font-size: 30px;
    text-align: center;
    line-height: 48px;
    border-radius: 8px;
  `,

  Caption: styled.p<{ password: string[] }>`
    color: var(--caption-color);
    font-size: 12px;
    margin: 8px 0 16px 4px;
    visibility: ${({ password }) =>
      password.join("").length === 2 && `${HIDDEN_ELEMENT_STYLE}`};
  `,
};

export default PasswordInput;
