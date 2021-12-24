import React from 'react'
import {SafeAreaView, View, Text } from 'react-native'
import ChatList from '../components/ChatList'
import Header from '../components/Header'
const ChatScreen = () => {
    return (
        <SafeAreaView>
        
        <Header title="Chats" />
        <ChatList/>
            {/* <Text>This is Chat Screen</Text> */}
        </SafeAreaView>
    )
}

export default ChatScreen
