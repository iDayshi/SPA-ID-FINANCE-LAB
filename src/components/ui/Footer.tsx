import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import SVG from 'react-inlinesvg';

const Footer = styled.footer`
  width: 100%;
  background: #111;
  margin-top: 1.5rem;
  position: absolute;
  left: 0;
  bottom: 0;
  max-height: 200px;
`;

const Container = styled.div`
  text-align: center;
`;

const StyledSVG = styled(SVG)`
  width: 50px;
  height: 50px;
`;

const FooterStyledComponent = () => {
  return (
    <Footer>
      <Container>
        <StyledSVG src={logo} />
      </Container>
    </Footer>
  );
};

export default FooterStyledComponent;
