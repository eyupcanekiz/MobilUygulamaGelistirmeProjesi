import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Picker, Alert } from "react-native";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

const db = getFirestore();

const AdminDashboard = () => {
  const [selectedGuide, setSelectedGuide] = useState("Kılavuz 1"); // Varsayılan kılavuz seçimi
  const [ageGroup, setAgeGroup] = useState("");
  const [type, setType] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [guideData, setGuideData] = useState([]);

  // Yeni kılavuz ekleme
  const handleAddGuide = async () => {
    try {
      await addDoc(collection(db, "Guides"), {
        ageGroup,
        type,
        min: parseFloat(min),
        max: parseFloat(max),
        guideName: selectedGuide,
      });
      Alert.alert("Başarılı", `${selectedGuide} kılavuzuna veri eklendi.`);
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  // Seçilen kılavuz verilerini getirme
  const handleFetchGuideData = async () => {
    try {
      const q = query(collection(db, "Guides"), where("guideName", "==", selectedGuide));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGuideData(data);
      Alert.alert("Başarılı", `${selectedGuide} kılavuzundan veriler getirildi.`);
    } catch (error) {
      Alert.alert("Hata", "Kılavuz verileri getirilirken bir sorun oluştu: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kılavuz Yönetimi</Text>
      <Picker selectedValue={selectedGuide} onValueChange={(itemValue) => setSelectedGuide(itemValue)} style={styles.input}>
        <Picker.Item label="Kılavuz 1" value="Kılavuz 1" />
        <Picker.Item label="Kılavuz 2" value="Kılavuz 2" />
        <Picker.Item label="Kılavuz 3" value="Kılavuz 3" />
        <Picker.Item label="Kılavuz 4" value="Kılavuz 4" />
        <Picker.Item label="Kılavuz 5" value="Kılavuz 5" />
      </Picker>
      <TextInput placeholder="Yaş Grubu" value={ageGroup} onChangeText={setAgeGroup} style={styles.input} />
      <TextInput placeholder="Tip (IgA, IgM...)" value={type} onChangeText={setType} style={styles.input} />
      <TextInput placeholder="Min Değer" value={min} onChangeText={setMin} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Max Değer" value={max} onChangeText={setMax} style={styles.input} keyboardType="numeric" />
      <Button title="Kılavuz Verisi Ekle" onPress={handleAddGuide} />

      <Text style={styles.title}>Seçilen Kılavuz Verileri</Text>
      <Button title="Kılavuz Verilerini Getir" onPress={handleFetchGuideData} />
      <FlatList
        data={guideData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reportCard}>
            <Text>Yaş Grubu: {item.ageGroup}</Text>
            <Text>Tip: {item.type}</Text>
            <Text>Min: {item.min}</Text>
            <Text>Max: {item.max}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  reportCard: { padding: 10, marginVertical: 5, backgroundColor: "#f9f9f9", borderRadius: 5 },
});

export default AdminDashboard;
