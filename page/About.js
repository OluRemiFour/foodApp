import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const About = ({navigation}) => {
    const handleBack = ()=> {
        navigation.goBack()
    }
  return (
    <View>
      <Text>About</Text>
      <TouchableOpacity onPress={handleBack}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default About

const styles = StyleSheet.create({})