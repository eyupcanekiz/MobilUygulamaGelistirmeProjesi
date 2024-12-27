import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
  Picker, // Dropdown için
} from "react-native";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

const db = getFirestore();

const AdminDashboard = () => {
  const [guideName, setGuideName] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [IgG, setIgG] = useState("");
  const [IgA, setIgA] = useState("");
  const [IgM, setIgM] = useState("");
  const [selectedGuide, setSelectedGuide] = useState(""); // Seçilen kılavuz
  const [guides, setGuides] = useState([]);

  // Kılavuz ekleme işlevi
  const addGuide = async () => {
    try {
      await addDoc(collection(db, "Guides"), {
        guideName,
        ageGroup,
        IgG,
        IgA,
        IgM,
      });
      Alert.alert("Başarılı", "Kılavuz eklendi.");
      fetchGuides();
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  // Belirli bir kılavuzun verilerini getirme işlevi
  const fetchGuides = async () => {
    try {
      if (!selectedGuide) {
        Alert.alert("Uyarı", "Lütfen bir kılavuz seçin!");
        return;
      }

      const q = query(collection(db, "Guides"), where("guideName", "==", selectedGuide));
      const snapshot = await getDocs(q);
      const guidesList = snapshot.docs.map((doc) => doc.data());
      setGuides(guidesList);
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Kılavuz Seçimi */}
      <Text style={styles.label}>Kılavuz Seçimi</Text>
      <Picker
        selectedValue={selectedGuide}
        onValueChange={(itemValue) => setSelectedGuide(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Kılavuz Seçin" value="" />
        <Picker.Item label="Kılavuz 1" value="Kılavuz 1" />
        <Picker.Item label="Kılavuz 2" value="Kılavuz 2" />
        <Picker.Item label="Kılavuz 3" value="Kılavuz 3" />
        <Picker.Item label="Kılavuz 4" value="Kılavuz 4" />
        <Picker.Item label="Kılavuz 5" value="Kılavuz 5" />
      </Picker>

      {/* Kılavuz Ekleme */}
      <Text style={styles.label}>Yeni Kılavuz Ekle</Text>
      <TextInput
        style={styles.input}
        placeholder="Kılavuz Adı"
        value={guideName}
        onChangeText={setGuideName}
      />
      <TextInput
        style={styles.input}
        placeholder="Yaş Grubu (ör. 0-5 months)"
        value={ageGroup}
        onChangeText={setAgeGroup}
      />
      <TextInput
        style={styles.input}
        placeholder="IgG Aralığı (ör. 1.0-1.34)"
        value={IgG}
        onChangeText={setIgG}
      />
      <TextInput
        style={styles.input}
        placeholder="IgA Aralığı (ör. 0.07-0.37)"
        value={IgA}
        onChangeText={setIgA}
      />
      <TextInput
        style={styles.input}
        placeholder="IgM Aralığı (ör. 0.26-1.22)"
        value={IgM}
        onChangeText={setIgM}
      />
      <Button title="Kılavuz Ekle" onPress={addGuide} />

      {/* Seçilen Kılavuzun Verilerini Getirme */}
      <Button title="Seçilen Kılavuzu Getir" onPress={fetchGuides} />

      {/* Kılavuz Listeleme */}
      <FlatList
        data={guides}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.guideItem}>
            <Text>Kılavuz: {item.guideName}</Text>
            <Text>Yaş Grubu: {item.ageGroup}</Text>
            <Text>IgG: {item.IgG}, IgA: {item.IgA}, IgM: {item.IgM}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
  label: { fontSize: 16, marginVertical: 10, fontWeight: "bold" },
  picker: { height: 50, width: "100%", marginBottom: 20, borderWidth: 1 },
  guideItem: { marginVertical: 10, padding: 10, borderWidth: 1, borderRadius: 5, backgroundColor: "#f9f9f9" },
});

export default AdminDashboard;
