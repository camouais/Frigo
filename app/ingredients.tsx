import { View, Text, FlatList, StyleSheet } from 'react-native';

const ingredients = ['Tomates', 'Poivrons', 'Oeufs'];

export default function IngredientsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrédients détectés :</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.item}>✅ {item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: { fontSize: 18, paddingVertical: 10 },
});
