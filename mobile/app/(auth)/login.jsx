import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import styles from '../../assets/styles/login.styles.js'
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../../constants/colors'
import { Link } from 'expo-router'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = () => { }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <View style={styles.container}>
          <View style={styles.topIllustration}>
            <Image
              source={require('../../assets/images/movie.png')}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.card}>
            <View style={styles.formContainer}>
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
              <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
                {isLoading ? (<ActivityIndicator color="#fff" />) : (<Text style={styles.buttonText}>Login</Text>)}
              </TouchableOpacity>
              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <Link href="/signup" asChild style={styles.link}>
                  <TouchableOpacity>
                    <Text style={styles.linkText}>Sign up</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}