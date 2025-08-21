import { createGlobalStyle } from "styled-components";
import { colors, fonts } from "./variables";
const GlobalStyles = createGlobalStyle` body { margin: 0; font-family: ${fonts.main}; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background-color: ${colors.tertiary}; color: ${colors.text}; min-height: 100vh; } #root { display: flex; flex-direction: column; min-height: 100vh; } * { box-sizing: border-box; } `;
export default GlobalStyles;
