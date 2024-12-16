/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import Root from "./src/navigation/Root";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./styles/theme";

function App(): React.JSX.Element {
	const isDark = useColorScheme() === "dark";
	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<NavigationContainer>
				<Root />
			</NavigationContainer>
		</ThemeProvider>
	);
}

export default App;
