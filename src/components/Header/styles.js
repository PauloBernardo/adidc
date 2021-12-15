import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 80px;
`;

export const PageTitle = styled.p`
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  margin: 0;

  /* 500 */
  color: #a0aec0;
`;

export const SearchIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3592 12.1808L16.9283 15.7492L15.7492 16.9283L12.1808 13.3592C10.8531 14.4235 9.20167 15.0024 7.5 15C3.36 15 0 11.64 0 7.5C0 3.36 3.36 0 7.5 0C11.64 0 15 3.36 15 7.5C15.0024 9.20167 14.4235 10.8531 13.3592 12.1808ZM11.6875 11.5625C12.7451 10.4749 13.3357 9.01702 13.3333 7.5C13.3333 4.27667 10.7225 1.66667 7.5 1.66667C4.27667 1.66667 1.66667 4.27667 1.66667 7.5C1.66667 10.7225 4.27667 13.3333 7.5 13.3333C9.01702 13.3357 10.4749 12.7451 11.5625 11.6875L11.6875 11.5625Z"
      fill="#CBD5E0"
    />
  </svg>
);

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;

  /* 300 */
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
  border-radius: 4px;
  width: 20%;
  margin-left: 20px;
`;

export const SearchText = styled.p.attrs({
  type: 'text',
})`
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  margin: 0 10px;

  /* 400 */
  color: #cbd5e0;
`;

export const AccountOption = styled.a`
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  margin-left: 10px;
  margin-right: 10px;
  /* identical to box height */
  cursor: pointer;

  /* 700 */
  color: #4a5568;
`;

export const AccountOptionContainer = styled.div`
  display: flex;
  justify-self: flex-end;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
`;

export const AccountIcon = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
