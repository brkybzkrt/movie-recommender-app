import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/create.style.js";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { Rating } from "react-native-ratings";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { MultiSelect } from 'react-native-element-dropdown';

export default function Create() {

  const dataGenre = [
    { id: '1', name: 'Action' },
    { id: '2', name: 'Comedy' },
    { id: '3', name: 'Drama' },
    { id: '4', name: 'Horror' },
    { id: '5', name: 'Sci-Fi' },
    { id: '6', name: 'Romance' },
  ];

  const router = useRouter();
  const { user } = useAuthStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(3);
  // const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState([]);
  // const [director, setDirector] = useState("");
  // const [cast, setCast] = useState("");
  const [moviePoster, setMoviePoster] = useState(null);

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCreate = async () => {};

  const pickOutImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }
      const pickedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });
      if (!pickedImage.canceled) {
        setSelectedImage(pickedImage.assets[0].uri);

        if (pickedImage.assets[0].base64) {
          setMoviePoster(pickedImage.assets[0].base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(
            pickedImage.assets[0].uri,
            { encoding: FileSystem.EncodingType.Base64 }
          );
          setMoviePoster(base64);
        }
      }
    }
  };
  // const ratingCompleted = (rating) => {
  //   setRating(rating);
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.scrollViewStyle}
        >
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>Create A New Movie</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Title</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="add"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    placeholderTextColor={COLORS.placeholderText}
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Description</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput
                    style={styles.textArea}
                    placeholder="Enter description"
                    placeholderTextColor={COLORS.placeholderText}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                  />
                </View>
              </View>
              <View style={styles.formGroup}>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <Rating
                    showRating
                    ratingCount={5}
                    // fractions={2}
                    value={rating}
                    imageSize={50}
                    style={{ paddingVertical: 10, width: "100%" }}
                    onFinishRating={setRating}
                  />
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Genres</Text>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={dataGenre}
                  labelField="name"
                  valueField="id"
                  placeholder="Select Genres"
                  value={genre}
                  search
                  searchPlaceholder="Search..."
                  onChange={items => {
                    setGenre(items);
                  }}
                  renderLeftIcon={() => (
                    <Ionicons
                      style={styles.icon}
                      color={COLORS.textSecondary}
                      name="film-outline"
                      size={20}
                    />
                  )}
                  selectedStyle={styles.selectedStyle}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Movie Image</Text>
                <TouchableOpacity
                  style={styles.imagePicker}
                  onPress={pickOutImage}
                >
                  {selectedImage ? (
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.previewImage}
                    />
                  ) : (
                    <View style={styles.placeholderContainer}>
                      <Ionicons
                        name="image-outline"
                        size={40}
                        color={COLORS.textSecondary}
                      />
                      <Text style={styles.placeholderText}>Pick an image</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.formGroup}>
                <TouchableOpacity style={styles.button} onPress={handleCreate}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Create</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
