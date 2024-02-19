import { StyleSheet, View } from "react-native";
// import DotLoadingAnimation from "./src/component/DotLoadingAnimation";
import CircularProgressLoadingAnimation from "./src/component/CircularProgressLoadingAnimation";

const App = () => {

  return (
    <View style={styles.container}>
      <CircularProgressLoadingAnimation />
      {/* <DotLoadingAnimation /> */}
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