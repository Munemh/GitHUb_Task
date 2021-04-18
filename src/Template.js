
import React, { useState, useEffect } from 'react';

import {
    Button,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,

    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const TemplateItem = (props) => {
    

    return (
        <TouchableOpacity style={{
            backgroundColor: 'white', marginTop: 10, marginBottom: 10
        }} onPress={() => { console.log('working',props.item); }}>
           <Text>{props.item.reponame  ?props.item.reponame :props.item.name }</Text></TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    thumbnail: { marginLeft: 5, width: 40, height: 40, borderRadius: 40 / 2 },
    title: { color: '#000', fontSize: 15, fontWeight: 'bold', marginTop: 10 },
    channelName: { fontSize: 13 },
    actionsView: { flexDirection: 'row', alignItems: 'center' },
    horContainer: { marginRight: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

});
export default TemplateItem;