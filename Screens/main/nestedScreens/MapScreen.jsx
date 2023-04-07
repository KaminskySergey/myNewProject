import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';
const MapScreen = () => {
    return (
        <>
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude: 50.516339,
                longitude: 30.602185,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }}>
                <Marker coordinate={{latitude: 50.516339, longitude: 30.602185}}/>
            </MapView>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

export default MapScreen;