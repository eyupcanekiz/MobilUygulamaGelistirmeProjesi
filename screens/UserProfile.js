import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const UserProfile = ({ navigation }) => {
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || "");
  const [email, setEmail] = useState(auth.currentUser?.email || "");

  const handleUpdateProfile = async () => {
    try {
      // Kullanıcı adını güncelleme
      await updateProfile(auth.currentUser, { displayName });
      Alert.alert("Başarılı", "Profil bilgileri güncellendi.");
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Bilgilerini Güncelle</Text>
      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email (Değiştirilemez)"
        value={email}
        editable={false} // Email değiştirilemez
      />
      <Button title="Güncelle" onPress={handleUpdateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20, borderRadius: 5 },
});

export default UserProfile;
