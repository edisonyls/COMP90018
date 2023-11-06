// PostOption.js
import React from 'react';
import { View, TouchableOpacity, Image} from 'react-native';

const PostOption = ({ navigation }) => {
  // Function to handle when a post type is selected
  const handlePostTypeSelect = (type) => {
    // Logic for handling selection
    console.log('Selected post type:', type);
    // You can navigate or perform other actions here
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      
      {/* Option 1: Find My Pet */}
      <TouchableOpacity onPress={() => navigation.navigate("FindMyPet")}>
        <Image 
          source={require('../assets/postOption1.jpg')} // replace with your image's path
          style={{ width: 350, height: 130, marginBottom: 30 }} // adjust dimensions and spacing as needed
        />
      </TouchableOpacity>

      {/* Option 2: Help Pets Go Home */}
      <TouchableOpacity onPress={() => navigation.navigate("FindLostPet")}>
        <Image 
          source={require('../assets/postOption2.jpg')} // replace with your image's path
          style={{ width: 350, height: 110, marginBottom: 30 }} // adjust dimensions and spacing as needed
        />
      </TouchableOpacity>

      {/* Option 3: Share Experience */}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Image 
          source={require('../assets/postOption3.jpg')} // replace with your image's path
          style={{ width: 350, height: 110, marginBottom: 100 }} // adjust dimensions and spacing as needed
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image 
          source={require('../assets/closeButton.jpg')} // replace with your image's path
          style={{ width: 60, height: 60, marginBottom: 20 }} // adjust dimensions and spacing as needed
        />
      </TouchableOpacity>



      
    </View>
  );
};

export default PostOption;


