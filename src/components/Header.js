import React from "react";
import styled from "styled-components";
import { colors,fonts } from '../styles/variables';
import variables from '../styles/variables';
import { Link } from  "react-router-dom";

const AppHeader = styled.header`
    background-color: ${colors.teritiary};
    padding: 20px;
    text-align: center;
    border-bottom: 2px solid ${colors.primary};
`;

const Tittle = styled.h1`
    color: ${colors.primary};
    font-size: 3rem;
    text-decoration: none;
    font-family: ${fonts.starwars ? fonts.starwars : 'Impact, sans-serif'};
    text-shadow: 0 0  10px ${colors.primary};
    transition: transform 0.2s ease-in-out;
    &:hover {
        transform: scale(1.05);
    }
`;

const Header = () => {
    return (
        <AppHeader>
            <Tittle to="/">Star Wars Explorer</Tittle>
        </AppHeader>
    );
};

export default Header;