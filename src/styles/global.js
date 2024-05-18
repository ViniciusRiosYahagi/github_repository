import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box;
	}

	html, body, #root {
		min-height: 100%;
	}

	body, input, button {
		color: #333;
		font-size: 14px;
		font-family: Arial, Helvetica, sans-serif;
	}

	body {
		background-color: #0d2636;
		font-size: 14px;
		-webkit-font-smoothing: antialiased !important
	}
`