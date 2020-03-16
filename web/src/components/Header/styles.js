import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #dddddd;
    }

    a {
      font-weight: bold;
      color: #999999;
      padding: 0 10px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  padding-left: 20px;

  strong {
    display: block;
    color: #666666;
  }

  a {
    display: block;
    margin-top: 2px;
    color: #de3b3b;
  }
`;
