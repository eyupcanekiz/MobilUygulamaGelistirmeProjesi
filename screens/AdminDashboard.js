import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

const AdminDashboard = () => {
  const [ageGroup, setAgeGroup] = useState("");
  const [type, setType] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const handleAddGuide = async () => {
    try {
      await addDoc(collection(db, "Guides"), { ageGroup, type, min: parseFloat(min), max: parseFloat(max) });
      Alert.alert("Başarılı", "Kılavuz eklendi.");
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Yaş Grubu" value={ageGroup} onChangeText={setAgeGroup} style={styles.input} />
      <TextInput placeholder="Tip (IgA, IgM...)" value={type} onChangeText={setType} style={styles.input} />
      <TextInput placeholder="Min Değer" value={min} onChangeText={setMin} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Max Değer" value={max} onChangeText={setMax} style={styles.input} keyboardType="numeric" />
      <Button title="Kılavuz Ekle" onPress={handleAddGuide} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default AdminDashboard;
