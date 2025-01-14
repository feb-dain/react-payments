import { CardInfo, ExpirationDate } from "types";
import { LIMIT_LENGTH, VALID_INPUT } from "constants/limit";
const { ONLY_NUMBER, ONLY_ENGLISH, VALID_MONTH } = VALID_INPUT;

export const isInvalidDate = (
  target: HTMLInputElement | HTMLFormElement,
  date: ExpirationDate
) => {
  const { isInvalidMonth, isExpired } = validation;

  if (isInvalidMonth(target)) return true;

  const isTargetMonth = target.name === "month";
  const isTargetYear = target.name === "year";

  if (isTargetMonth && isExpired(target.value, date.year)) return true;
  if (isTargetYear && isExpired(date.month, target.value)) return true;
};

export const isValidInfo = (cardInfo: CardInfo) => {
  const { cardCompany, month, year, code, password1, password2 } = cardInfo;
  const { isAllValidLength, isValidLength, isValidCardCompany } = validation;

  const cardNumbers = Array.from(
    { length: LIMIT_LENGTH.CARD_NUMBER },
    (_, index) => cardInfo[`number${index + 1}`]
  );

  const validateCardNumber = isAllValidLength(
    cardNumbers,
    LIMIT_LENGTH.CARD_NUMBER
  );
  const validateDate = isAllValidLength(
    [month, year],
    LIMIT_LENGTH.EXPIRATION_DATE
  );
  const validateCode = isValidLength(code, LIMIT_LENGTH.SECURITY_CODE);
  const validatePassword = isAllValidLength(
    [password1, password2],
    LIMIT_LENGTH.PASSWORD
  );
  const validateCardCompany = isValidCardCompany(cardCompany);

  const validationResult = [
    validateCardNumber,
    validateDate,
    validateCode,
    validatePassword,
    validateCardCompany,
  ];

  return validationResult.every((result) => result === true);
};

const validation = {
  isAllValidLength(array: string[], length: number) {
    return array.every((value) => value.length === length);
  },

  isValidLength(value: string, length: number) {
    return value.length === length;
  },

  isInvalidMonth(target: HTMLInputElement | HTMLFormElement) {
    const value = target.value;
    const isValidMonth = target.name === "month" && Number(value) > VALID_MONTH;

    return isValidMonth || value === "00";
  },

  isExpired(inputMonth: string, inputYear: string) {
    const current = new Date();
    const thisYear = String(current.getFullYear()).slice(2, 4);
    const thisMonth = String(current.getMonth() + 1);

    const isBlank = inputMonth === "" || inputYear === "";
    const isTyping =
      inputYear === thisYear[0] ||
      (thisYear === inputYear && inputMonth.length === 1);

    if (isBlank || isTyping) return false;
    if (inputYear > thisYear || Number(inputYear) > Number(thisYear))
      return false;

    return thisYear === inputYear
      ? Number(thisMonth) > Number(inputMonth)
      : true;
  },

  isValidCardCompany(cardCompany: string) {
    return Boolean(cardCompany.length);
  },
};

export const shouldPreventFocusMovement = (
  target: EventTarget & HTMLFormElement,
  allCardInfo: CardInfo
) => {
  const { name, value, maxLength } = target;

  if (name === "name") {
    const validValue = value.replace(ONLY_ENGLISH, "");

    return validValue.length !== maxLength;
  }

  const { month, year } = allCardInfo;

  const isValidDate = isInvalidDate(target, { month, year });
  if ((name === "month" || name === "year") && isValidDate) return true;

  const validValue = value.replace(ONLY_NUMBER, "");

  return validValue.length !== maxLength;
};
