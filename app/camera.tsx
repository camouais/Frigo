import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef } from 'react';
import { useRouter } from 'expo-router';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View><Text>Chargement des permissions...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Nous avons besoin de l'accès à la caméra</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Autoriser la caméra</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current?.takePictureAsync) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo?.uri) {
        console.log("Photo prise :", photo.uri);
        router.push('/ingredients');
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back" 
      >
        <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1, justifyContent: 'flex-end' },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 40,
    borderWidth: 5,
    borderColor: '#4CAF50',
  },
});
