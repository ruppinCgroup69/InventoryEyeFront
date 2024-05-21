import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import * as PostService from "@/services/post.service";
import {
  CategoryType,
  CategoryTypes,
  PostCreatingScheme,
  PostCreationDto,
} from "@/types/post.types";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { View, Text, Button, Image, TextField, Picker } from "react-native-ui-lib";
import { authStyles } from "@/app/auth/_layout";
import { postStyles } from "./_layout";
import { ActivityIndicator } from "react-native";
import ChooseAddress, {
  LocationModalContextProvider,
  useLocationModal,
} from "../modals/choose_address_modal";
import { usePosts } from "@/context/PostContext";
import { ZodError } from "zod";

export default function NewPostScreen() {
  const { allPostsLoading, createPost, postCreationError } = usePosts();
  const { user } = useAuth();
  const { selectedLocation } = useLocationModal();

  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({
    userId: null,
    postContent: null,
    category: null,
    imageUrl: null,
    addressLatitude: null,
    addressLongtitude: null,
    tags: null,
  });

  const [newPost, setNewPost] = useState<PostCreationDto>({
    userId: user!.userId,
    postContent: "",
    category: CategoryType.ANIMAL,
    addressLatitude: 0,
    addressLongtitude: 0,
    tags: "",
  });

  const onChangeField = <T extends keyof PostCreationDto>(key: T, value: PostCreationDto[T]) => {
    setNewPost({ ...newPost, [key]: value });
    onChangeFieldError(key, null); // remove errors when user types in for this field
  };

  const onChangeFieldError = <T extends keyof PostCreationDto>(key: T, value: string | null) => {
    setFormErrors({ ...formErrors, [key]: value });
  };

  async function onUploadImage() {
    if (!selectedImage) {
      Alert.alert("Cannot upload emtpy image");
      return;
    }
    let localUri = selectedImage;
    let filename = localUri.split("/").pop()!;

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Create form data
    let formData = new FormData();
    formData.append('photo', { uri: localUri, name: filename, type } as any);

    try {
      const { fileUrl } = await PostService.uploadImage(formData);
      return fileUrl;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async function onPostSubmit() {
    try {
      newPost.category = +newPost.category; // parse it into a number
      const validatedForm = PostCreatingScheme.parse(newPost);
      const uploadedImageUrl = await onUploadImage();
      console.log(uploadedImageUrl)
      if (!uploadedImageUrl) {
        // image upload failed..
        Alert.alert("Post Failed to publish, please try again later");
        return;
      }
      // set the image url for the post
      validatedForm.imageUrl = uploadedImageUrl;

      const postCreationSuccess = await createPost(validatedForm);
      if (postCreationSuccess) {
        // navigate back to posts tab
        Alert.alert("Post created successfully");
        router.navigate("/home/posts");
      }
    } catch (e) {
      if (e instanceof ZodError) {
        const errors = e.issues
          .map((issue) => {
            const { path, message } = issue;
            const fieldName = path.join(".");
            return { [fieldName]: message };
          })
          .reduce((prev, next) => ({ ...prev, ...next }), {});
        setFormErrors({ ...formErrors, ...errors });
        console.error(errors);
      } else {
        // Handle other errors
        console.error(e);
      }
    }
  }

  async function openGallery() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  }

  async function openCamera() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera is required!");
      return;
    }

    // Launch the camera
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  }

  return (
    <LocationModalContextProvider>
      <ScrollView contentContainerStyle={{ alignItems: "flex-start", justifyContent: "center" }}>
        <View style={postStyles.postForm}>
          <View style={postStyles.postFormContainerSecondary}>
            <View style={postStyles.postContentImageContainer}>
              <View style={postStyles.profileImageContainer}>
                <Image
                  source={{ uri: user?.imageUrl }}
                  style={{ width: 30, height: 30, borderRadius: "50%", border: "solid gray" }}
                />
                <Text>{user?.fullName}</Text>
              </View>

              <TextField
                placeholder="What would you like to search for?"
                textAlignVertical="top"
                multiline
                containerStyle={postStyles.postContentField}
                onChangeText={(text:string) => onChangeField("postContent", text)}
                placeholderTextColor={"gray"}
              />
            </View>

            {formErrors.postContent && (
              <Text red10 style={authStyles.textFieldError}>
                {formErrors.postContent}
              </Text>
            )}
          </View>

          <View style={postStyles.postFormContainerSecondary}>
            <Text style={{ paddingLeft: 8, paddingVertical: 8 }}>Product name</Text>
            <TextField
              placeholder="Product name"
              textAlignVertical="top"
              containerStyle={authStyles.textField}
              // onChangeText={(text) => onChangeField("", text)}
              placeholderTextColor={"gray"}
            />
            {formErrors.postContent && (
              <Text red10 style={authStyles.textFieldError}>
                {formErrors.postContent}
              </Text>
            )}
          </View>

          <View style={postStyles.imageSelectionContainer}>
            <Text style={{ paddingLeft: 8 }}>Category</Text>

            <View style={authStyles.textField}>
              <Picker
                value={newPost.category}
                placeholder={"Choose Category"}
                onChange={(e:string) => onChangeField("category", e as any)}
              >
                {Object.entries(CategoryTypes).map((item) => (
                  <Picker.Item value={+item[0]} label={item[1]} />
                ))}
              </Picker>
            </View>

            {selectedImage && (
              <Image style={{ height: 100, width: 100 }} source={{ uri: selectedImage }} />
            )}
            <Button onPress={openGallery} style={authStyles.Btn}>
              <Text>Select Image From gallery</Text>
            </Button>
          </View>
          <Text style={{ paddingLeft: 8, paddingVertical: 8 }}>Search Area</Text>
          <View style={authStyles.textField}>
            <Link href="/modals">
              {selectedLocation ? (
                <Text>{selectedLocation.name} </Text>
              ) : (
                <Text>Choose address</Text>
              )}
            </Link>
            {formErrors.postContent && (
              <Text red10 style={authStyles.textFieldError}>
                {formErrors.postContent}
              </Text>
            )}
          </View>
          <Button
            onPress={onPostSubmit}
            style={[authStyles.Btn, { marginVertical: 16, marginHorizontal: "auto" }]}
          >
            <Text>Publish Post</Text>
          </Button>
          {allPostsLoading && <ActivityIndicator size="small" />}
          {postCreationError && <Text>{postCreationError}</Text>}
        </View>
      </ScrollView>
    </LocationModalContextProvider>
  );
}
