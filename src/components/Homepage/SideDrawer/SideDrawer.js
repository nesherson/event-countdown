import { createPortal } from 'react-dom';
import Styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

import EventIcon from '../../../Assets/icons/Event';

const Backdrop = Styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    transition: all 0.5s ease-in-out;
    ${(props) =>
      props.show
        ? css`
            opacity: 1;
            pointer-events: visible;
          `
        : css`
            opacity: 0;
            pointer-events: none;
          `}
`;

const Aside = Styled.aside`
    background: rgb(12,28,63);
    background: linear-gradient(90deg, rgba(12,28,63,1) 10%, rgba(16,38,76,1) 39%, rgba(22,54,96,0.9808123933167017) 98%);
    color: #f4f4f4;
    width: 150px;
    height: 100%;
    transition: all 0.5s ease-in-out;
    ${(props) =>
      props.show
        ? css`
            transform: translateX(0);
          `
        : css`
            transform: translateX(-500px);
          `}
`;

const LogoWrapper = Styled.div`
    padding: 25px 3px 0 5px;
`;

const LogoIcon = Styled.div`
    display: inline-block;
    padding: 0 5px;
`;

const LogoTextFirst = Styled.h2`
    margin: 0;
    padding: 0;
    color: #fff;
    display: inline-block;
    line-height: 0.3em;
`;

const LogoTextSecond = Styled.h2`
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 1.4rem;
    line-height: 0.7em;
`;

const NavigationList = Styled.ul`
    list-style: none;
    margin: 30px 0 0 0 ;
    padding: 0;
`;

const Navigation = Styled.nav`
    padding: 25px 20px;
`;

const ListItem = Styled.li`
    font-size: 1.15rem;
    margin: 15px 0;
`;

const StyledLink = Styled(NavLink)`
  text-decoration: none;
  color: #fff;
  padding: 7px;
    &:hover {
        border-left: 3px solid #4681ea;
    }
    &.active {
    border-left: 3px solid #8cb2f2;
    }
`;

const SideDrawer = ({ show, toggle }) => {
  return createPortal(
    <>
      <Backdrop show={show} onClick={toggle}>
        <Aside
          show={show}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <LogoWrapper>
            <LogoIcon>
              <EventIcon width={34} height={32} />
            </LogoIcon>
            <LogoTextFirst>Event</LogoTextFirst>
            <LogoTextSecond>Countdown</LogoTextSecond>
          </LogoWrapper>

          <Navigation>
            <NavigationList>
              <ListItem>
                <StyledLink to='/events'>Events</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to='/add-event'>Add Event</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to='/options'>Options</StyledLink>
              </ListItem>
            </NavigationList>
          </Navigation>
        </Aside>
      </Backdrop>
    </>,
    document.getElementById('root')
  );
};

export default SideDrawer;
