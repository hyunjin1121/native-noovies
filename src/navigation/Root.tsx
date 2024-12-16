import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";

const { Navigator, Screen } = createNativeStackNavigator();

const Root = () => (
	<Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
		<Screen name="Tabs" component={Tabs} />
		<Screen name="Stack" component={Stack} />
	</Navigator>
);

export default Root;
