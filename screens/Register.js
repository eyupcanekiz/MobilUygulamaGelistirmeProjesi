import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase";

const db = getFirestore();

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      console.log("Kayıt işlemi başlıyor...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      console.log("Kayıt başarılı. Kullanıcı UID:", userId);

      // Eğer email "eyupcan@gmail.com" ise role "admin", aksi takdirde "user" yap
      const role = email === "eyupcan@gmail.com" ? "admin" : "user";

      // Firestore'da `users` koleksiyonuna kullanıcı ekleme
      await setDoc(doc(db, "users", userId), {
        email: email,
        role: role,
      });

      Alert.alert("Kayıt Başarılı!", "Şimdi giriş yapabilirsiniz.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Kayıt Hatası:", error.message);
      Alert.alert("Kayıt Hatası", error.message);
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
      <Button title="Kayıt Ol" onPress={handleRegister} />
      <Button title="Giriş Yap" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default Register;
