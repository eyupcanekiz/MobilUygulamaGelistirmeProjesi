import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, FlatList, Text } from "react-native";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

const AdminDashboard = () => {
  // Kılavuz ekleme için state
  const [ageGroup, setAgeGroup] = useState("");
  const [type, setType] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  // Kılavuz arama için state
  const [searchAgeGroup, setSearchAgeGroup] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Hasta takibi için state
  const [patientName, setPatientName] = useState("");
  const [patientReports, setPatientReports] = useState([]);

  // Kılavuz ekleme işlemi
  const handleAddGuide = async () => {
    try {
      await addDoc(collection(db, "Guides"), {
        ageGroup,
        type,
        min: parseFloat(min),
        max: parseFloat(max),
      });
      Alert.alert("Başarılı", "Kılavuz başarıyla eklendi!");
      setAgeGroup("");
      setType("");
      setMin("");
      setMax("");
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  // Kılavuz arama işlemi
  const handleSearchGuide = async () => {
    try {
      const q = query(
        collection(db, "Guides"),
        where("ageGroup", "==", searchAgeGroup),
        where("type", "==", searchType)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Sonuç Bulunamadı", "Girilen kriterlere uygun kılavuz bulunamadı.");
        setSearchResults([]);
      } else {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push(doc.data());
        });
        setSearchResults(results);
      }
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  // Hasta tahlilleri arama işlemi
  const fetchReportsByPatient = async () => {
    try {
      const q = query(
        collection(db, "Reports"),
        where("patientName", "==", patientName)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Sonuç Bulunamadı", "Girilen isme uygun tahlil bulunamadı.");
        setPatientReports([]);
      } else {
        const reports = [];
        querySnapshot.forEach((doc) => {
          reports.push(doc.data());
        });
        setPatientReports(reports);
      }
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Kılavuz Ekleme */}
      <Text style={styles.header}>Kılavuz Ekle</Text>
      <TextInput
        placeholder="Yaş Grubu (örn. 0-5 months)"
        value={ageGroup}
        onChangeText={setAgeGroup}
        style={styles.input}
      />
      <TextInput
        placeholder="Tip (örn. IgA, IgM)"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />
      <TextInput
        placeholder="Min Değer"
        value={min}
        onChangeText={setMin}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Max Değer"
        value={max}
        onChangeText={setMax}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Kılavuz Ekle" onPress={handleAddGuide} />

      {/* Kılavuz Arama */}
      <Text style={styles.header}>Kılavuz Ara</Text>
      <TextInput
        placeholder="Yaş Grubu (örn. 0-5 months)"
        value={searchAgeGroup}
        onChangeText={setSearchAgeGroup}
        style={styles.input}
      />
      <TextInput
        placeholder="Tip (örn. IgA, IgM)"
        value={searchType}
        onChangeText={setSearchType}
        style={styles.input}
      />
      <Button title="Kılavuz Ara" onPress={handleSearchGuide} />
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultCard}>
            <Text>Yaş Grubu: {item.ageGroup}</Text>
            <Text>Tip: {item.type}</Text>
            <Text>Min: {item.min}</Text>
            <Text>Max: {item.max}</Text>
          </View>
        )}
      />

      {/* Hasta Tahlil Sonuçları */}
      <Text style={styles.header}>Hasta Tahlil Sonuçları</Text>
      <TextInput
        placeholder="Hasta Adı"
        value={patientName}
        onChangeText={setPatientName}
        style={styles.input}
      />
      <Button title="Tahlilleri Getir" onPress={fetchReportsByPatient} />
      <FlatList
        data={patientReports}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultCard}>
            <Text>Hasta Adı: {item.patientName}</Text>
            <Text>Tip: {item.type}</Text>
            <Text>Değer: {item.value}</Text>
            <Text>Tarih: {new Date(item.date.seconds * 1000).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  resultCard: { padding: 10, marginVertical: 5, backgroundColor: "#f9f9f9", borderRadius: 5 },
});

export default AdminDashboard;
