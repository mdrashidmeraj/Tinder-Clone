import { useNavigation } from '@react-navigation/native';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React,{useState} from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import tw from "tailwind-rn";
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';

const ModalScreen = () => {
    const {user} = useAuth();
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);
    const inComplete = !image || !job || !age

    const updateUserProfile = () => {
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoURL: image,
            job: job,
            age: age,
            timestamp: serverTimestamp()
        }).then(()=>{
            navigation.navigate('Home')
        }).catch((error)=> {
            alert(error.message)
        })
    }

    return (
        <View style={tw("flex-1 items-center pt-1")}>
        <View style={tw("h-5 w-full")}></View>
            <Image
                style={tw("h-20 w-full")}
                resizeMode ="contain"
                source={{uri: "https://links.papareact.com/2pf"}}
            />
            <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>Welcome {user.displayName}</Text>
            <Text style={tw("text-center p-4 font-bold text-red-400")}>Step 1: The Profile Pic</Text>
            <TextInput 
                value={image}
                onChangeText={text=> setImage(text)}
                style={tw("text-center text-xl pb-2")}
                placeholder='Enter Profile Pic URL'
            />
            <Text style={tw("text-center p-4 font-bold text-red-400")}>Step 2: The Job</Text>
            <TextInput
                value={job}
                onChangeText={text=> setJob(text)}
                style={tw("text-center text-xl pb-2")}
                placeholder='Enter Your Occupation'
            />
            <Text style={tw("text-center p-4 font-bold text-red-400")}>Step 3: The Age</Text>
            <TextInput
                value={age}
                onChangeText={text=> setAge(text)}
                style={tw("text-center text-xl pb-2")}
                placeholder='Enter Your Age'
                keyboardType='numeric'
            />
            <TouchableOpacity 
                disabled={inComplete}
                style={[tw("absolute rounded-xl bottom-10  p-3 w-64"), 
                    inComplete ? tw('bg-gray-400'): tw("bg-red-400")
                ]}
                onPress={updateUserProfile}
            >
                <Text style={tw("text-white text-xl text-center")}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModalScreen
