import styled from 'styled-components';

export const Item = styled.a`
  color: white;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};

  &:hover {
    color: gray;
  }
`;

export const BrandName = styled.a`
  margin-top: 20px;
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  /* identical to box height */

  color: white;
  &:hover {
    color: gray;
  }
`;

export const ButtonLogout = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  justify-items: center;
  justify-content: center;
  flex: 1;
  align-items: center;
  background-color: #012813;
  color: white;

  font-family: Roboto, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;

  padding: 15px;

  cursor: pointer;
`;
