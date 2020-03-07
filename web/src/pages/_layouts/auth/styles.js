import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  padding: 60px 30px;
  border-radius: 4px;

  img {
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
  }

  label {
    text-align: left;
  }

  form {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
  }

  input {
    width: 300px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    height: 45px;
    padding: 0 15px;
    margin: 0 0 10px;
    opacity: 1;
  }

  button {
    width: 300px;
    margin: 5px 0 0;
    height: 45px;
    background: #7d40e7;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#7d40e7')};
    }
  }
`;
