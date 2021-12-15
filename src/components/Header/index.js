import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  AccountIcon,
  AccountOption,
  AccountOptionContainer,
  Container,
  PageTitle,
  SearchContainer,
  SearchIcon,
  SearchText,
} from './styles';

const Header = ({ title }) => {
  const photo = useSelector((state) => state.user.user.photo);
  const history = useHistory();

  return (
    <Container>
      <PageTitle>{title}</PageTitle>
      <SearchContainer>
        <SearchIcon />
        <SearchText> Pesquisar... </SearchText>
      </SearchContainer>

      <AccountOptionContainer>
        <AccountOption onClick={() => history.push('/aboutPage')}>
          Sobre
        </AccountOption>
        <AccountIcon
          onClick={() => history.push('/config')}
          src={`data:image/jpeg;base64, ${photo}`}
          alt="accountPhoto"
        />
      </AccountOptionContainer>
    </Container>
  );
};

export default Header;
