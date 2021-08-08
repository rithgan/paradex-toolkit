import React from "react";
import styled from 'styled-components'
import Button from "../../../components/Button/Button";
import { useWalletModal } from "../../WalletModal";
import { Login } from "../../WalletModal/types";
import LangSelector from "./LangSelector";
import { Language } from "../types";

interface Props {
  account?: string;
  login: Login;
  logout: () => void;
  currentLang: string;
  langs: Language[];
  setLang: (lang: Language) => void;
}

const TopEntry = styled.div`
  display:flex;
  align-items;center;
  justify-content: space-between;
`

const UserBlock: React.FC<Props> = ({ account, login, logout ,currentLang, langs,setLang}) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (
    <TopEntry>
      <LangSelector currentLang={currentLang} langs={langs} setLang={setLang} />
      {account ? (
        <Button
          scale="sm"
          variant="tertiary"
          onClick={() => {
            onPresentAccountModal();
          }}
        >
          {accountEllipsis}
        </Button>
      ) : (
        <Button
          scale="sm"
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          Connect
        </Button>
      )}

    </TopEntry>
  );
};

export default React.memo(
  UserBlock,
  (prevProps, nextProps) =>
    prevProps.account === nextProps.account &&
    prevProps.login === nextProps.login &&
    prevProps.logout === nextProps.logout
);
