import { StyleSheet, View } from "react-native";
import DotLoadingAnimation from "./src/component/DotLoadingAnimation";

const App = () => {

  return (
    <View style={styles.container}>
      <DotLoadingAnimation />
    </View>
  )
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})