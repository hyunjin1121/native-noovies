import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, useColorScheme, View } from "react-native";
import {
	BLACK_COLOR,
	GREY_COLOR,
	WHITE_COLOR,
	YELLOW_COLOR,
} from "../assets/colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
	const isDark = useColorScheme() === "dark";

	return (
		<Tab.Navigator
			sceneContainerStyle={{
				backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
			}}
			screenOptions={{
				tabBarStyle: {
					backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
				},
				tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
				tabBarInactiveTintColor: isDark ? WHITE_COLOR : GREY_COLOR,
				headerStyle: {
					backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
				},
				headerTitleStyle: {
					color: isDark ? WHITE_COLOR : BLACK_COLOR,
				},
				tabBarLabelStyle: {
					marginTop: -5,
					fontSize: 12,
					fontWeight: "600",
				},
			}}
		>
			<Tab.Screen
				name="Movies"
				component={Movies}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<View>
								<Text style={{ color: color }}>Icon</Text>
							</View>
						);
					},
				}}
			/>
			<Tab.Screen
				name="TV"
				component={Tv}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<View>
								<Text style={{ color: color }}>Icon</Text>
							</View>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<View>
								<Text style={{ color: color }}>Icon</Text>
							</View>
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
