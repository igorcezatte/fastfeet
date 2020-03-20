import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #444444;
    margin: 40px 0;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      width: 237px;
      height: 36px;
      display: flex;
      align-items: center;
      background: #fff;
      border: 1px solid #ddd;
      padding: 0 15px;
      border-radius: 4px;

      input {
        display: flex;
        height: 100%;
        border: none;
        color: #444;
        &::placeholder {
          color: #999;
        }
      }
    }
  }
  button {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #7d40e7;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    padding: 0 15px;
    border-radius: 4px;
    border: none;
    &:hover {
      background: ${darken(0.1, '#7d40e7')};
    }

    svg {
      margin-right: 5px;
    }
  }
`;
