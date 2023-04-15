import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({route}) => {
  
  const {latitude, longitude} = route.params.location.coords
  
  return (
        
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude, 
                longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.006,
            }}>
                <Marker coordinate={{latitude, longitude}}/>
            </MapView>
        </View>
        
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