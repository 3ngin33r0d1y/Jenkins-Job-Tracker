import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const NavbarContainer = styled.nav`
  background-color: var(--surface-color);
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-color)'};
  text-decoration: none;
  font-weight: ${props => props.active ? '500' : '400'};
  padding: 8px 0;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s;
  }
  
  &:hover {
    color: var(--primary-color);
    
    &:after {
      width: 100%;
    }
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserName = styled.span`
  color: var(--text-color);
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  const handleLogout = () => {
    // In a real app, this would dispatch logout action
    console.log('Logging out');
  };
  
  return (
    <NavbarContainer>
      <Logo to="/">Jenkins Job Tracker</Logo>
      
      {isAuthenticated && (
        <NavLinks>
          <NavLink to="/dashboard" active={location.pathname === '/dashboard'}>
            Dashboard
          </NavLink>
          <NavLink to="/jobs" active={location.pathname === '/jobs'}>
            Jobs
          </NavLink>
          <NavLink to="/schedules" active={location.pathname === '/schedules'}>
            Schedules
          </NavLink>
        </NavLinks>
      )}
      
      {isAuthenticated ? (
        <UserSection>
          <UserName>{user?.username}</UserName>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserSection>
      ) : (
        <NavLink to="/login" active={location.pathname === '/login'}>
          Login
        </NavLink>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
