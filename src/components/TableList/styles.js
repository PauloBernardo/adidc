import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Title = styled.h1`
  /* Alertas */
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;

  width: 50%;
  /* 700 */
  color: #4a5568;
`;

export const TH = styled.th`
  text-align: center;
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  /* 700 */
  color: #4a5568;
`;

export const Select = styled.select`
  margin: 50px;
  width: 200px;
  padding: 10px 35px 10px 10px;
  font-size: 16px;

  font-family: Roboto, serif;
  font-style: normal;
  font-weight: normal;
  line-height: 19px;
  /* identical to box height */

  /* 400 */
  color: #cbd5e0;

  /* 300 */
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
  border-radius: 4px;

  height: 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(data:image/jpeg;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTU4MjUgNi42MjVMOC43Nzk5MiA3LjgwMzMzTDYuNjY2NTkgNS42OVYxNi42NjY3SDQuOTk5OTJWNS42OUwyLjg4NzQyIDcuODAzMzNMMS43MDgyNSA2LjYyNUw1LjgzMzI1IDIuNUw5Ljk1ODI1IDYuNjI1Wk0xOC4yOTE2IDEzLjM3NUwxNC4xNjY2IDE3LjVMMTAuMDQxNiAxMy4zNzVMMTEuMjE5OSAxMi4xOTY3TDEzLjMzNDEgMTQuMzFMMTMuMzMzMyAzLjMzMzMzSDE0Ljk5OTlWMTQuMzFMMTcuMTEzMyAxMi4xOTY3TDE4LjI5MTYgMTMuMzc1VjEzLjM3NVoiIGZpbGw9IiNDQkQ1RTAiLz4KPC9zdmc+Cg==)
    96% / 15% no-repeat #fff;
`;

export const TD = styled.td`
  text-align: center;
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  /* 600 */
  color: #718096;
`;

export const TDRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 80px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-items: right;
  margin: 5px;
`;
