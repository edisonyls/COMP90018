import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons'; // Importing AntDesign for the dropdown icon
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const FindMyPet = () => {
  const [imageUri, setImageUri] = useState(null);
  //const [petCategory, setPetCategory] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false); // New state variable to track picker status
  const [petCategory, setPetCategory] = useState(null); // State variable for the selected pet category
  // State to hold the pet's breed input
  const [petBreed, setPetBreed] = useState('');
  // State to hold the pet's name input
  const[petName, setPetName] = useState('');

  //find pet location 
  const [location, setLocation] = useState(null);




  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      //ref.current?.setAddressText('Some Text');
    })();


  }, []);

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handlePickerFocus = () => {
    setIsPickerOpen(previousState => !previousState); // Toggle the current state of the picker's open/close status
  };

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
    >
      <ScrollView style={styles.mainContainer} keyboardShouldPersistTaps='handled'>
        <View style={styles.formContainer}>
            {/* Image Selector Field */}
            <TouchableOpacity onPress={handleSelectImage} style={styles.imageSelector}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
                <Text>Select Image</Text>
            )}
            </TouchableOpacity>
            

            {/* Pet Category Dropdown */}
            <View style={styles.dropdownContainer}>
            <Text style={styles.inputLabel}>* Pet Category</Text>
            <RNPickerSelect
                onValueChange={(value) => setPetCategory(value)}
                onOpen={handlePickerFocus} // Here we use the function
                onClose={handlePickerFocus} // Here too
                items={[
                    { label: 'Cat', value: 'cat' },
                    { label: 'Dog', value: 'dog' },
                    { label: 'Rabbit', value: 'rabbit' },
                    { label: 'Hamster', value: 'hamster' },
                    { label: 'Other', value: 'other' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: "Select a pet category...", value: null }}
                value={petCategory}
                useNativeAndroidPickerStyle={false} // Required for custom styling to take effect on Android

                Icon={() => {
                    return (
                    <View style={styles.iconContainer}>
                        <AntDesign name={isPickerOpen ? "up" : "down"} size={30} color="gray" /> 
                    </View>
                    );
                }}

            />
            </View>

            {/* Pet Breed Input */}
            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}> * Pet's Breed</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={setPetBreed}
                value={petBreed}
                placeholder="Enter pet's breed"
                // Here you can set if you want the first letter to be auto-capitalized, etc.
                autoCapitalize="words"
            />
            </View>

            {/* Pet Name Input */}
            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}> * Pet's Name</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={setPetName}
                value={petName}
                placeholder="Enter pet's name"
                // Here you can set if you want the first letter to be auto-capitalized, etc.
                autoCapitalize="words"
            />
            </View>
            
            {/*Pet Lost Location*/}
            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}> * Location of Lost</Text>
                <GooglePlacesAutocomplete
                    placeholder='Enter Location'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        const lat = details.geometry.location.lat;
                        const lng = details.geometry.location.lng;
                        setLocation({latitude: lat, longitude: lng});
                    }}
                    listViewDisplayed='auto' // 'auto' or boolean to ensure the list view is handled correctly
                    
                    query={{
                        key: 'AIzaSyCLOAAZfuZhFLjzSZcqDdpSIgaKxZ6nyng', // Ensure this API key is valid and has billing enabled
                        language: 'en',
                    }}
                    fetchDetails={true}
                    
                    styles={{
                        textInputContainer: {
                            height: 40, // or whatever height you find appropriate
                            borderColor: 'gray', // you can have a specific color for your project
                            borderWidth: 1, // this is the border for the input field
                            paddingLeft: 10, // space between text and the border
                            borderRadius: 5, // if you want rounded corners
                        },
                        listView: {
                          backgroundColor: 'white',
                          zIndex: 1000, // very important to ensure list is overlayed
                        },
                        textInput: {
                          height: 38,
                          color: '#5d5d5d',
                          fontSize: 13,
                        },
                        predefinedPlacesDescription: {
                          color: '#1faadb',
                        },
                    }}

                />

                {location && (
                    <MapView
                    style={styles.map}
                    provider={MapView.PROVIDER_GOOGLE}
                    initialRegion={{
                        ...location,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    >
                        <Marker coordinate={location} />
                    </MapView>
                )}
        </View>

            {/* Additional form fields will be added here */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    paddingTop: 125,
    paddingHorizontal: 35,
  },
  imageSelector: {
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'dashed',
    borderRadius: 1,
    width: 320,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // reduced space for the next form field
  },
  imagePreview: {
    width: 300,
    height: 180,
  },
  iconContainer: {
    // This is the new style for the icon container
    position: 'absolute',
    right: 10, // for horizontal positioning - adjust as needed
    top: 7,   // for vertical positioning - adjust as needed
    // You can also add padding, backgroundColor, etc., here if needed
  },

  inputContainer: {
    marginBottom: 20, // Space for the next form field
    // You can add more styling for the container if you need
  },
  inputLabel: {
    fontSize: 13, // or another appropriate size
    fontWeight: 'bold',
    marginBottom: 6, // space below the label
    // ... any other styling you need
  },
  textInput: {
    height: 40, // or whatever height you find appropriate
    borderColor: 'gray', // you can have a specific color for your project
    borderWidth: 1, // this is the border for the input field
    paddingLeft: 10, // space between text and the border
    borderRadius: 5, // if you want rounded corners
    // ... other styles you might want
  },

  map: {
    width: '100%',
    height: '70%', // Adjust as needed
  },

  container: {
    flex: 1,
    padding: 20, // or the value that suits your design
    backgroundColor: '#fff', // or your preferred background color
  },

  autocompleteContainer: {
    flex: 1, // Ensure this container takes the full available space
    // Add other styles you might need for this container
  },

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 20, // space for the next form field
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 20, // space for the next form field
  },

  dropdownLabel: {
    fontSize: 16, // or another appropriate size
    fontWeight: 'bold',
    marginBottom: 10, // space below the label
    // ... any other styling you need
  },

  

});

export default FindMyPet;
