import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from "react-native";
import { BLACK_COLOR, WHITE_COLOR } from "../assets/colors";
import { useEffect } from "react";
import { makeImgPath } from "../screens/Movies/utils";
import LinearGradient from "react-native-linear-gradient";

const Detail = ({
	navigation: { setOptions },
	route: {
		params: { detailData },
	},
}) => {
	const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

	useEffect(() => {
		setOptions({
			title: 'Movie',
		});
	}, []);
	return (
		<>
			<View
				style={{
					width: windowWidth,
					height: windowHeight / 4,
					justifyContent: "flex-end",
					paddingLeft: 20,
				}}
			>
				<Image
					source={{ uri: makeImgPath(detailData.backdrop_path) || "" }}
					style={{
						flex: 1,
						position: "absolute",
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
					}}
				/>
				<LinearGradient
					colors={["transparent", BLACK_COLOR]}
					style={{
						flex: 1,
						height: windowHeight / 4,
						position: "absolute",
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
					}}
				/>
				<View style={{ flexDirection: "row", width: "80%" }}>
					<Image
						source={{ uri: makeImgPath(detailData.poster_path) }}
						style={{ width: 100, height: 160, borderRadius: 7 }}
					/>
					<Text
						style={{
							color: "white",
							fontSize: 36,
							alignSelf: "flex-end",
							width: "80%",
              marginLeft: 15,
              fontWeight: 500
						}}
					>
						{detailData.title}
					</Text>
				</View>
			</View>
			<Text style={{color: 'white', marginTop: 20, paddingHorizontal: 20}}>{detailData.overview}</Text>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	gradient: {
		width: 300,
		height: 200,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	text: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
});

const NativeStack = createNativeStackNavigator();

const Stack = () => {
	const isDark = useColorScheme() === "dark";
	return (
		<NativeStack.Navigator
			screenOptions={{
				headerBackTitleVisible: false,
				headerStyle: {
					backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
				},
				headerTitleStyle: {
					color: isDark ? WHITE_COLOR : BLACK_COLOR,
				},
				contentStyle: {
					backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
				},
			}}
		>
			<NativeStack.Screen name="Detail" component={Detail} />
		</NativeStack.Navigator>
	);
};

export default Stack;
