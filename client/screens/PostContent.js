import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import {BASE_URL} from "../api/auth";
import Icon from 'react-native-vector-icons/FontAwesome';
const API_KEY = 'AIzaSyCLOAAZfuZhFLjzSZcqDdpSIgaKxZ6nyng';


const PostContent = ({ postId }) => {

    const [postData, setPostData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [allUserData, setAllUserData] = useState(null);
    const [comment, setComment] = useState('');
    const [address, setAddress] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [likedComments, setLikedComments] = useState({});//Initialize the current like status
    
    useEffect(() => {
        const fetchPostAndUserData = async () => {
            try {
                // Fetch the specific post data
                const postResponse = await axios.get(`http://${BASE_URL}:8080/post/getAllPosts/${postId}`);
                if (postResponse.success) {
                const specificPost = postResponse.data.data.find(post => post.id === postId);
            
                if (specificPost) {
                    setPostData(specificPost);
                    
                    // Fetch the user data using the posterId from the specific post
                    const allUserResponse = await axios.get(`http://${BASE_URL}:8080/user/queryUserInfo/`);
                    const userResponse = await axios.get(`http://${BASE_URL}:8080/user/queryUserInfo/${specificPost.posterId}`);
                    if (userResponse.success && allUserResponse.success) {
                    setUserData(userResponse.data.data);
                    setAllUserData(allUserData);

                    } else {
                    console.log('Failed to fetch user data');
                    }
                } else {
                    console.log('Post not found');
                }
                } else {
                console.log('Failed to fetch posts');
                }
            } catch (error) {
                console.error('Error fetching post or user data:', error);
            }
        };
            fetchPostAndUserData();
    }, [postId]);

    //Get the address from the latitude and longitude
    useEffect(() => {
        if (postData.latitude && postData.longitude) {
          getGeocode(postData.latitude, postData.longitude);
        }
      }, [postData.latitude, postData.longitude]);
    
      const getGeocode = async (latitude, longitude) => {
        const apiKey = API_KEY; // Ensure this is kept secret and not exposed
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    
        try {
          const response = await axios.get(url);
          if (response.data && response.data.results && response.data.results.length > 0) {
            // Typically, the formatted address you want is in the first result
            const address = response.data.results[0].formatted_address;
            setAddress(address);
          } else {
            throw new Error('No results found');
          }
        } catch (error) {
          console.error('Error fetching the address:', error);
          setAddress('Unable to get address');
        }
    };



    const renderPostContent = () => {
      return(
        <ScrollView style={styles.container}>
        
            {postData.picture && (
            <Image
                source={{ uri: postData.picture }}
                style={styles.image}
            />
            )}
    
            {/* Render the location row only if both latitude and longitude are available */}
            {postData.latitude && postData.longitude && (
                <View style={styles.infoRow}>
                    <Icon name="location-arrow" size={24} color="#000" /> 
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Text style={styles.locationText}>{address}</Text>
                    </ScrollView>
                </View>
            )}
    
            {postData.title && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Title:</Text>
                <Text style={styles.infoValue}>{postData.title}</Text>
            </View>
            )}
    
            {postData.petCategory && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Pet's Category:</Text>
                <Text style={styles.infoValue}>{postData.petCategory}</Text>
            </View>
            )}
    
            {postData.petBreed && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Pet's Breed:</Text>
                <Text style={styles.infoValue}>{postData.petBreed}</Text>
            </View>
            )}
    
            {postData.petName && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Pet's Name:</Text>
                <Text style={styles.infoValue}>{postData.petName}</Text>
            </View>
            )}
    
            {postData.contactNum && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Contact Number:</Text>
                <Text style={styles.infoValue}>{postData.contactNum}</Text>
            </View>
            )}
    
            {postData.rewards && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Rewards:</Text>
                <Text style={styles.infoValue}>{postData.rewards}</Text>
            </View>
            )}
    
            {postData.description && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Description:</Text>
                <Text style={styles.infoValue}>{postData.description}</Text>
            </View>
            )}
    
            {postData.content && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Content:</Text>
                <Text style={styles.infoValue}>{postData.content}</Text>
            </View>
            )}
    
            {postData.tag && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tag:</Text>
                <Text style={styles.infoValue}>{postData.tag}</Text>
            </View>
            )}

        </ScrollView>
        
      );
    };




    {/* Like section*/}
    const handleLikeComment = (commentId) => {
        // This function will toggle the liked status and update the like count
        // also send this update to your backend
        setLikedComments((prevLikedComments) => {
          const isLiked = prevLikedComments[commentId];
          return {
            ...prevLikedComments,
            [commentId]: !isLiked
          };
        });
        // Send update to backend here
        // axios.post(`/likeComment/${commentId}`) or similar
    };


    

    {/*Comments Section*/}

    useEffect(() => {
        const fetchComments = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`http://${BASE_URL}:8080/comment/GetCommentList`, {
              params: {
                post_id: postData.id, 
              }
            });
      
            if (response.data && response.success) {
              setComments(response.data.data);
            } else {
              // Handle the case where the response is not as expected
              return null;
            }
          } catch (e) {
            setError('An error occurred while fetching comments');
          } finally {
            setLoading(false);
          }
        };
      
        if (postData && postData.id) {
          fetchComments();
        }
    }, [postData]); // This will re-run the effect if postData changes
      

    const renderComments = () => {
        // Sort comments by create_time, assuming create_time is in ISO format
        const sortedComments = comments.sort(
          (a, b) => new Date(b.create_time) - new Date(a.create_time)
        );
    
        return sortedComments.map((comment) => {
            const user = allUserData.find(user => user.id === comment.poster_id);
    
            return (
              <View key={comment.id} style={styles.commentContainer}>
                {user && (
                    <Image
                      source={{ uri: user.profile }} // 'profile' is the correct field for the user's profile image
                      style={styles.commentProfileImage}
                    />
                )}
                <View style={styles.commentTextContainer}>
                  <Text style={styles.commentText}>{comment.content}</Text>
                  <Text style={styles.commentTimestamp}>
                    {new Date(comment.create_time).toLocaleString()} {/* Format date */}
                  </Text>
                </View>
              </View>
            );
        });
    };
    
      


    // Add function to deal with sending the comments
    const handleSendComment = () => {
        // Logic for sending a comment
        setComment('');
    };












  
    if (!postData || !userData) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.profileSection}>

            {/* Profile Section */}
            {userData.profile && (
                <Image
                    source={{ uri: userData.profile }}
                    style={styles.profileImage}
                    />
                )}
                {userData.nickname && (
                    <View style={styles.usernameContainer}>
                    <Text style={styles.usernameText}>{userData.nickname}</Text>
                    </View>
                )}
          </View>

          {/*Post content section where varies by the post type*/}
          <View>
            {renderPostContent()}
          </View>
          
          {/*Comments displayed in time order*/}
          <View style={styles.commentsSection}>
            {renderComments()}
          </View>
        </ScrollView>
  
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.likeButton}>
            <AntDesign name="hearto" size={24} color="black" />
            <Text>{postData.likesCounts}</Text>
          </TouchableOpacity>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Write a comment..."
            style={styles.commentInput}
          />
          <TouchableOpacity onPress={handleSendComment} style={styles.sendButton}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
   
    scrollContainer: {
      flex: 1,
    },

    profileSection: {
        alignItems: 'center',
        marginTop: 20,
    },

    profileImage: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    borderRadius: 50, // This should be half of the width and height to make it round
    borderWidth: 3, // Adjust border width as needed
    borderColor: 'white', // If you want a white border around the profile image
    },

    usernameContainer: {
    backgroundColor: '#A5A6F6',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    },

    usernameText: {
    color: 'white',
    fontWeight: 'bold',
    },
    



    bottomSection: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderColor: '#ccc',
      padding: 10,
    },
    likeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10,
    },
    commentInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      marginRight: 10,
      padding: 5,
    },
    sendButton: {
      padding: 10,
      backgroundColor: 'skyblue',
      borderRadius: 5,
    },

    container: {
        flex: 1,
        padding: 10,
      },
      image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 10,
      },
      infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
      infoLabel: {
        backgroundColor: '#A5A6F6',
        borderRadius: 10,
        padding: 5,
      },
      infoValue: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        padding: 5,
        marginLeft: 5,
      },
      locationText: {
        marginLeft: 5,
      },
  });
  
  export default PostContent;


