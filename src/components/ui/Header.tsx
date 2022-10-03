import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/react.svg';
import SVG from 'react-inlinesvg';

const Header = styled.header`
  width: 100%;
  background: #111;
  max-height: 200px;
`;

const Container = styled.div`
  text-align: center;
`;

const StyledSVG = styled(SVG)`
  width: 50px;
  height: 50px;
`;

const HeaderStyledComponent = () => {
  return (
    <Header>
      <Container>
        <StyledSVG src={logo} />
      </Container>
    </Header>
  );
};

export default HeaderStyledComponent;
