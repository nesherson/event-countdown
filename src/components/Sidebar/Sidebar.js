import Styled, { css } from 'styled-components';
import { Link } from 'wouter';

const Aside = Styled.aside`
    grid-row-start: 1;
    grid-row-end: end;
    grid-column-start: 1;
    grid-column-end: 2;
    background: rgb(12,28,63);
    background: linear-gradient(90deg, rgba(12,28,63,1) 10%, rgba(16,38,76,1) 39%, rgba(22,54,96,0.9808123933167017) 98%);
    color: #f4f4f4;

    @media only screen and (max-width: 768px) {
      display: none;
    }
`;

const LogoWrapper = Styled.div`
    background: rgb(12,28,63);
    background: linear-gradient(90deg, rgba(12,28,63,1) 10%, rgba(16,38,76,1) 39%, rgba(22,54,96,0.9808123933167017) 98%);
    box-sizing: border-box;
`;

const Logo = Styled.h2`
    margin: 0;
    padding: 25px 35px;
    color: #fff;
`;

const NavigationList = Styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Navigation = Styled.nav`
    padding: 25px 20px;
`;

const ListItem = Styled.li`
    padding: 10px 7px;
    font-size: 1.15rem;
    &:hover {
        border-left: 3px solid #4681ea;
    }
    &.active {
      border-left: 3px solid #4681ea;
    }
`;

const StyledLink = Styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const Sidebar = () => {
  return (
    <Aside>
      <LogoWrapper>
        <Logo>LOGO</Logo>
      </LogoWrapper>
      <Navigation>
        <NavigationList>
          <ListItem>
            <StyledLink href='/events'>Events</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink href='/add-event'>Add Event</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink href='/options'>Options</StyledLink>
          </ListItem>
        </NavigationList>
      </Navigation>
    </Aside>
  );
};

export default Sidebar;
