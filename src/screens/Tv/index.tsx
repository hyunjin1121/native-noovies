import { Pressable, StyleSheet, Text, View } from "react-native";

const Tv = () => {
	return (
		<View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
			<Pressable
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? "lightgray" : "white",
					},
					styles.button,
				]}
				onPress={() => {
					console.log("Button pressed!");
				}}
			>
				<Text style={styles.text}>Press Me</Text>
			</Pressable>
			<Text>Tv</Text>
		</View>
	);
};

export default Tv;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    fontSize: 16,
  },
});