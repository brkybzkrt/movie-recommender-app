import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'
import React,{useState} from 'react'
import styles from '../../assets/styles/signup.styles.js'
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../../constants/colors'
import { useRouter, Link} from 'expo-router'



export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleSignup = () => { }

  const router = useRouter();

  return (
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.container}>
            <View  style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>Create an account to start using our app</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Username</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                    <TextInput style={styles.input} placeholder="Enter your username" placeholderTextColor={COLORS.placeholderText} value={username} onChangeText={setUsername} />
                  </View>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                    <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor={COLORS.placeholderText} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                  </View>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                    <TextInput style={styles.input} placeholder="Enter your password" placeholderTextColor={COLORS.placeholderText} value={password} onChangeText={setPassword} secureTextEntry={showPassword} />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.primary} style={styles.inputIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                  )}
                </TouchableOpacity>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>Already have an account?</Text>
                 
                    <TouchableOpacity onPress={() => router.back()}>
                      <Text style={styles.linkText}>Login</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          
          
          </KeyboardAvoidingView>
     </TouchableWithoutFeedback>
  )
}