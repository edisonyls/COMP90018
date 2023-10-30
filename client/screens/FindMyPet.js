import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform,SafeAreaView,FlatList,Keyboard,Alert,toString } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';
import { AntDesign } from '@expo/vector-icons'; // Importing AntDesign for the dropdown icon
import MapView, { PROVIDER_GOOGLE }from 'react-native-maps';
import axios from "axios";

const API_KEY = 'AIzaSyCLOAAZfuZhFLjzSZcqDdpSIgaKxZ6nyng';

const FindMyPet = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  //const [petCategory, setPetCategory] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false); // New state variable to track picker status
  const [petCategory, setPetCategory] = useState(null); // State variable for the selected pet category
  // State to hold the pet's breed input
  const [petBreed, setPetBreed] = useState('');
  // State to hold the pet's name input
  const[petName, setPetName] = useState('');
  const[contactNumber,setContactNumber] = useState('');
  const[reward,setReward] = useState('');



  //find pet location 
  //const [location, setLocation] = useState({latitude:37.8136,longitude:144.9631});
  const [region, setRegion] = useState({latitude:37.8136,longitude:144.9631});

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  

  const searchLocation = async (text) => {
    setSearchKeyword(text);
  
    // If the search keyword is empty, don't perform a search
    if (text.trim() === '') {
      setSearchResults([]);
      setIsShowingResults(false);
      return;
    }
  
    try {
      const response = await axios.post(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${text}`
      );
  
      if (response.data.predictions.length > 0) {
        // Update the state with the new predictions, which will be displayed in the FlatList.
        // Do NOT fetch the place details here; you should do that only when the user selects a place.
        setSearchResults(response.data.predictions);
        setIsShowingResults(true);
      } else {
        setSearchResults([]);
        setIsShowingResults(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  

  const handleResultPress = (description, placeId) => {
    setSelectedPlaceId(placeId);
    setSearchKeyword(description);
    setIsShowingResults(false);
    //Keyboard.dismiss();
  };





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

  // Function to validate the form fields
  const validateForm = () => {
    if (!imageUri || !petCategory || !petBreed || !petName || !contactNumber ||!selectedPlaceId) {
      // One or more fields are empty
      Alert.alert('Missing Information', 'Please fill in all fields before submitting.');
      return false;
    }
    // All fields are filled
    return true;
  };


  // Function to handle the form submission
  const handleSubmit = async() => {
    if (validateForm()) {
      try {
        // Fetch the detailed information of the selected location
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${selectedPlaceId}&key=${API_KEY}`);
    
        if (response.data.result) {
          // Extract the coordinates
          const location = response.data.result.geometry.location;
    
          // Log the coordinates
          
          console.log('Form submitted with the following data:');
          console.log('Selected location coordinates:', location);
          console.log(`Image URI: ${imageUri}`);
          console.log(`Pet Category: ${petCategory}`);
          console.log(`Pet Breed: ${petBreed}`);
          console.log(`Pet Name: ${petName}`);
          console.log(`Contact Number: ${contactNumber}`);
          console.log(`Reward: ${reward}`);

          const petData = {
            pet_name: petName,
            pet_category: petCategory,
            pet_breed: petBreed,
            contact_number: contactNumber,
            reward: reward,
            image_uri: imageUri,
            location_lat: location.lat,
            location_lng: location.lng
          };

          try {
            const serverResponse = await axios.post('http://192.168.1.106:8080/comp-test', petData);
        
            if (serverResponse.data.status === 'success') {
                console.log('Data submitted successfully. ID:', serverResponse.data.id);
                // ... (clear your form fields and navigate away)
            } else {
                console.log('Server responded with an unexpected status.');
            }
          } catch (error) {
              //console.error('An error occurred while submitting the form:', error);
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
              } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
              }
              
          }

          
          
    
          // Here, you can also proceed with other form submission tasks...
          // For example, sending data to a server.
    
          // After successful submission, clear the form fields
          setPetName('');
          setPetCategory('');
          setPetBreed('');
          setSelectedPlaceId(null);
          setReward('');
          setContactNumber('');
        
          // or however you clear your location field
          // Clear other form fields as necessary
    
          // Use the navigation hook to navigate to another screen
          Alert.alert('Successfully Sumbmitted!');
          navigation.navigate('Home'); // replace 'NextScreen' with the actual name of your screen
    
        } else {
          console.log('Failed to retrieve location details.');
        }
      } catch (error) {
        console.log('An error occurred during form submission:', error);
      }
    }
  };

  return (
    // <KeyboardAvoidingView
    //     behavior={Platform.OS === "ios" ? "padding" : "height"}
    //     style={{ flex: 1 }}
    // >
    <View>
      {/* <ScrollView style={styles.mainContainer} keyboardShouldPersistTaps='handled'> */}
        <View style={styles.formContainer}>

            {/*Pet missing Location*/}
            <View style={styles.autocompleteContainer}>
            <Text style={styles.inputLabel}> * Location of Lost</Text>
              <TextInput
                placeholder="Search for an address"
                returnKeyType="search"
                style={styles.searchBox}
                placeholderTextColor="#000"
                onChangeText={(text) => searchLocation(text)}
                value={searchKeyword}
              />
              {isShowingResults && (
                <FlatList
                  data={searchResults}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.resultItem}
                      onPress={() => handleResultPress(item.description, item.place_id)}>
                      <Text>{item.description}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item,index) => item.id? item.id.toString(): index.toString()}
                  style={styles.searchResultsContainer}
                />
              )}
            </View>

            


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

            {/* Contact number input */}
            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}> * Contact Number</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={setContactNumber}
                value={contactNumber}
                placeholder="Enter your phone number"
  
            />
            </View>

            {/* Reward input */}
            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}> Rewards(Optional)</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={setReward}
                value={reward}
                placeholder="Enter the rewards"
  
            />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

        

            {/* Additional form fields will be added here */}
        </View>
      {/* </ScrollView> */}
      {/* <View style = {marginBottom:50, flex: 1}> </View> */}

    </View>
  );
}


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
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // reduced space for the next form field
    marginTop: 35,
  },
  imagePreview: {
    width: 300,
    height: 90,
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

  autocompleteContainer: {
    zIndex: 1,
  },
  searchResultsContainer: {
    width: 320, // or '100%' if you want it to have the full width of the screen
    maxHeight: 200, // or whatever maximum height you want
    backgroundColor: '#fff',
    position: 'absolute',
    top: 75, // this positions your results just below the TextInput field
    borderRadius:5,
  },
  resultItem: {
    width: '100%',
    justifyContent: 'center',
    height: 50,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  searchBox: {
    width: 320, // or '100%' if you want it to have the full width of the screen
    height: 40,
    fontSize: 14,
    borderRadius: 5,
    borderColor: 'grey',
    color: '#000',
    //backgroundColor: '#fff',
    borderWidth: 1,
    paddingLeft: 10,
  },

  submitButton: {
    backgroundColor: 'plum', // Use your app's color scheme here
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10, // Adjust as needed for spacing from the last form field
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
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
    fontSize: 14,
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
    fontSize: 14, // or another appropriate size
    fontWeight: 'bold',
    marginBottom: 10, // space below the label
    // ... any other styling you need
  },

  

});

export default FindMyPet;