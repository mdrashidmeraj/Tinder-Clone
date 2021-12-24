import { useRoute } from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView,Platform,TouchableWithoutFeedback, FlatList } from 'react-native'
import tw from 'tailwind-rn'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import { Ionicons } from 'react-native-vector-icons';
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

const MessagesScreen = () => {
    const {user} = useAuth(); 
    const {params} = useRoute();
    const {matchDetails} = params;
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    useEffect(() => 
        onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp','desc')),
        (snapshot) => setMessages(snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })))),[matchDetails, db])

    const sendMessage = () => { 
        addDoc(collection(db, "matches", matchDetails.id, 'messages'), {
            timestamp: serverTimestamp(),
            userId: user.uid,
            displayName: user.displayName,
            photoURL: matchDetails.users[user.uid].photoURL,
            message: input,
        })
        setInput('');
    }
    return (
        <SafeAreaView style={tw('flex-1')}>
        <Header title = {getMatchedUserInfo(matchDetails.users, user.uid).displayName} callEnabled/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding": "height"}
                style={tw('flex-1')}
                keyboardVerticalOffset={10}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FlatList
                    data = {messages}
                    style={tw('pl-4')}
                    inverted={-1}
                    keyExtractor={(item)=> item.id}
                    renderItem={({item: message})=> 
                        message.userId === user.uid ? 
                        (<SenderMessage key = {message.id} message={message}/>):
                        (<ReceiverMessage key={message.id} message={message}/>)
                    }

                />
                </TouchableWithoutFeedback>
                <View style={tw('flex-row justify-between items-center border-t border-gray-200 px-5 py-2')}>
                    <TextInput
                        style={tw('h-10 text-lg')}
                        placeholder='Send Message...'
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value={input}
                    />
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                        <Ionicons name = "send" size={24} color="#FF5864"/>
                    </TouchableOpacity> 
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default MessagesScreen
 