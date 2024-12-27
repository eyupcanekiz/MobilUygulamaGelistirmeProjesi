import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";

const db = getFirestore();

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Giriş işlemi başlıyor...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      console.log("Giriş başarılı. Kullanıcı UID:", userId);

      // Firestore'dan kullanıcı bilgilerini al
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userRole = userDoc.data().role;
        console.log("Kullanıcı rolü:", userRole);

        // Role göre yönlendirme
        if (userRole === "admin") {
          navigation.navigate("AdminDashboard");
        } else if (userRole === "user") {
          navigation.navigate("UserDashboard");
        } else {
          Alert.alert("Hata", "Kullanıcı rolü tanımlı değil.");
        }
      } else {
        Alert.alert("Hata", "Kullanıcı Firestore'da bulunamadı.");
      }
    } catch (error) {
      console.error("Giriş Hatası:", error.message);
      Alert.alert("Giriş Hatası", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <Button title="Kayıt Ol" onPress={() => navigation.navigate("Register")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default Login;
