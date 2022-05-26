import React, { Component } from 'react';
import {Share, Image, Text, View, StyleSheet, ScrollView, TouchableOpacity, Button} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Clipboard from 'expo-clipboard';




const MainPage = (props) => {

    const copyToClipboard = () => {
        Clipboard.setString(props.referralCode)
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `Codul meu e ${props.referralCode} baga-l in aplicatie pt bani infiniti`,
            });
        } 
        catch (error) {
            alert(error.message);
        }
    };

    var pline = new Array(props.silver)
    for(let i=0; i<pline.length; i++){
        pline[i]=3
    }

    var goale = new Array(props.silverRequiredForGold - props.silver)
    for(let i=0; i<goale.length; i++){
        goale[i]=3
    }
    
    return (
        <ScrollView style={{ padding: 15}}>

            {/* TOP */}

            <View style={styles.topElement}>
                <View style={{flex:1, marginRight:15}}>
                    <Text style={styles.topText}>{props.username}</Text>
                    <View style={{borderTopColor: 'white', borderTopWidth: 1.5, width: '100%'}}/>
                    <Text style={styles.topText}>{props.freeCoffees} GOLD</Text>
                </View>
                <Image source={require('../assets/logo_gold.png')} style={{ width: 70, height: 70}}/>
            </View>

            {/* RANG */}

            <View style={styles.rangView}>

                <TouchableOpacity style={{width:'100%'}} activeOpacity={0.6} onPress={() => console.log(props.rang)}>
                    <View style={{width:'100%'}}>
                        <Text style={styles.topText}>RANK: {props.rang}</Text>
                        <Image style={styles.helpButton} source={require('../assets/info_icon.png')}/>
                    </View>
                </TouchableOpacity>

                <View style={{borderTopColor: 'white', borderTopWidth: 1.5, width: '90%', alignSelf: 'center'}}/>
                
                <View style={{flexDirection:'row', alignItems:'center', padding:15, justifyContent:'space-around'}}>
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.rangText}>RESET:</Text>
                        <Text style={styles.rangText}>15 DAYS</Text>
                    </View>

                    <AnimatedCircularProgress
                        rotation={0}
                        size={100}
                        width={5}
                        fill={100*props.rankProgress/props.silverRequiredForRank}
                        tintColor="white"
                        backgroundColor="gray"
                    >
                        {(fill) => (
                            <Text style={styles.progressText}>
                                {props.rankProgress}/{props.silverRequiredForRank}
                            </Text>
                        )}
                    </AnimatedCircularProgress>

                    <View style={{alignItems:'center'}}>
                        <Text style={styles.rangText}>NEXT RANK:</Text>
                        <Text style={styles.rangText}>{props.rangulUrmator}</Text>
                    </View>
                </View>
            </View>

            {/* CARD DE FIDELITATE */}

            <View style={styles.fidelityCardView}>

                <TouchableOpacity activeOpacity={0.6} style={{width:'100%'}} onPress={() => console.log(props.silver)}>
                    <View style={{width:'100%'}}>
                        <Text style={styles.topText}>LOYALTY CARD</Text>
                        <Image style={styles.helpButton} source={require('../assets/info_icon.png')}/>
                    </View>
                </TouchableOpacity>

                <View style={{borderTopColor: 'white', borderTopWidth: 1.5, width: '90%', alignSelf: 'center', paddingBottom:7}}/>
                
                {pline.map((item, key) => (
                    <Image key={key} style={{width:50, height:50, margin: 7}} source={require('../assets/logo.png')}/>
                ))}
                {goale.map((item, key) => (
                    <Image key={key} style={{width:50, height:50, margin: 7, opacity: 0.4}} source={require('../assets/logo.png')}/>
                ))}
                <Image style={{width:55, height:55, margin: 7}} source={require('../assets/logo_gold.png')}/>
            </View>

            {/* REFERAL */}

            <View style={styles.fidelityCardView}>

                <TouchableOpacity activeOpacity={0.6} style={{width:'100%'}} onPress={() => console.log(props.silver)}>
                    <View style={{width:'100%'}}>
                        <Text style={styles.topText}>REFERRAL</Text>
                        <Image style={styles.helpButton} source={require('../assets/info_icon.png')}/>
                    </View>
                </TouchableOpacity>

                <View style={{borderTopColor: 'white', borderTopWidth: 1.5, width: '90%', alignSelf: 'center', paddingBottom:7}}/>
                
                <Text style={styles.referralText}>
                    You receive 1 gold for each friend who completes the card for the first time
                </Text>
                
                <TouchableOpacity 
                    style={styles.referralCodeView} 
                    activeOpacity={0.5} 
                    onPress={() => copyToClipboard() }
                >
                    <Text style={styles.referralText}>{props.referralCode}</Text>
                    <Image style={{width: 25, height:25, resizeMode:'contain', right:5}} source={require('../assets/copy_icon.png')} />
                </TouchableOpacity>
                
                <View style={{flexDirection: 'row', justifyContent:'space-between', width:'90%'}}>
                    <Text style={styles.referralText}>{props.friends} friends</Text>
                    <Text style={styles.referralText}>{props.goldFromFriends} gold</Text>
                </View>

                <TouchableOpacity
                    onPress={() => onShare()}
                    style={styles.inviteButton}
                    activeOpacity={0.5} 
                >
                    <Text style={{color:'white', fontSize:18}}>INVITE FRIENDS</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    fidelityCardView: {
        borderWidth: 1.5,
        borderColor: 'white',
        marginBottom: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center'
    },

    inviteButton:{
        backgroundColor:'rgba(255, 255, 255, 0.14)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 10,
        marginBottom: 20,
    },

    helpButton: {
        width: 23,
        height: 23,
        top:5,
        right:5,
        position: 'absolute',
        resizeMode: 'contain'
    },

    progressText: {
        fontSize: 30,
        color: 'white',
        alignSelf: 'center'
    },

    rangText: {
        color:'white', 
        fontSize: 17,
    },

    rangView: {
        borderWidth: 1.5,
        borderColor: 'white',
        marginBottom: 50,
    },

    referralText: {
        color: 'white', 
        fontSize: 18, 
        textAlign:'center', 
        marginHorizontal: 15,
    },

    referralCodeView: {
        padding: 10,
        margin: 10,
        backgroundColor:'rgba(255, 255, 255, 0.14)',
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center',
        width:'90%'
    },
    
	topElement: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 50,
    },

    topText: {
        marginVertical: 3,
        fontSize: 22,
        color: 'white',
        alignSelf: 'center',
    }
});

export default MainPage;