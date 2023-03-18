import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { cartQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { currentUser, logout } from "../redux/userSlice";

const Container = styled.div`
  height: 60px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ height: "50px", padding: "10px 0" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "10px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1.5;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "0.75rem", marginLeft: "10px" })}
`;

const NavbarLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Navbar = () => {
  const quantity = useSelector(cartQuantity);
  const user = useSelector(currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Left>
        <Language>EN</Language>
        <SearchContainer>
          <Input placeholder="Search" />
          <Search style={{ color: "gray", fontSize: 16 }} />
        </SearchContainer>
        <NavbarLink to="/products">
          <MenuItem>PRODUCTS</MenuItem>
        </NavbarLink>
      </Left>
      <Center>
        <NavbarLink to="/">
          <Logo>J.A.Y.R.T</Logo>
        </NavbarLink>
      </Center>
      <Right>
        {user ? (
          <MenuItem>{`HI, ${user.username.toUpperCase()}`}</MenuItem>
        ) : (
          <NavbarLink to="/register">
            <MenuItem>REGISTER</MenuItem>
          </NavbarLink>
        )}
        {user ? (
          <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
        ) : (
          <NavbarLink to="/login">
            <MenuItem>LOGIN</MenuItem>
          </NavbarLink>
        )}
        <NavbarLink to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined color="action" />
            </Badge>
          </MenuItem>
        </NavbarLink>
      </Right>
    </Container>
  );
};

export default Navbar;
