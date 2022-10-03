import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/redux.svg';
import SVG from 'react-inlinesvg';

const Footer = styled.footer`
  width: 100%;
  background: #111;
  position: fixed;
  left: 0;
  bottom: 0;
  max-height: 200px;
	z-index: 100;
`;

const Container = styled.div`
  text-align: center;
`;

const StyledSVG = styled(SVG)`
  width: 30px;
  height: 30px;
  margin: 10px;
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
