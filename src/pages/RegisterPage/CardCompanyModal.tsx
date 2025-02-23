import { css } from "styled-components";
import CardCompany from "components/CardCompany";
import Modal from "woowahan-yummy-modal/dist/Modal";
import useInitCardInfo from "hooks/useInitCardInfo";
import { CARD_COMPANIES } from "constants/cardCompanies";
import { CloseButton } from "components/Button";

const CardCompanyModal = () => {
  const { cardCompany } = useInitCardInfo().cardInfo;

  return (
    <Modal
      modalStyle={modalStyle}
      buttonStyle={CloseButton}
      closeButtonName={
        cardCompany === "" ? "나중에 선택할래요" : "카드사를 선택했어요"
      }
      direction="bottom"
    >
      {Object.keys(CARD_COMPANIES).map((company) => (
        <CardCompany key={company} cardCompanyName={company} />
      ))}
    </Modal>
  );
};

const modalStyle = css`
  display: grid;
  align-content: center;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 28px;
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 999;
  transform: translateX(-50%);
  max-width: 480px;
  width: 100%;
  height: 320px;
  padding: 42px 22px 98px;
  border-radius: 5px 5px 0 0;
  background: #fdfdfd;
  overflow: hidden;
`;

export default CardCompanyModal;
