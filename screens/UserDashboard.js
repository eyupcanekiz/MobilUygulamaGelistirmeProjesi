import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

const UserDashboard = ({ navigation }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const q = query(collection(db, "Reports"), where("userID", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const reportData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(reportData);
      } catch (error) {
        Alert.alert("Hata", "Tahlilleri getirirken bir sorun oluştu.");
      }
    };

    fetchReports();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geçmiş Tahliller</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reportCard}>
            <Text>{item.patientName}</Text>
            <Text>{item.type}: {item.value}</Text>
            <Text>{new Date(item.date.seconds * 1000).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  reportCard: { padding: 10, marginVertical: 5, backgroundColor: "#f9f9f9", borderRadius: 5 },
});

  
export default UserDashboard;
