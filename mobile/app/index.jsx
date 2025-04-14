import { Text, View,StyleSheet} from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit app/index.tsx to edit this screeng.</Text>
      <Link href="/(auth)/login">Login</Link>
      <Link href="/(auth)/signup">Register</Link>
    </View>
  );
}


const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title:{
    color: "blue",
    fontSize: 20,
  }

})
