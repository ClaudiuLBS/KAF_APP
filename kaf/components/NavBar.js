import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Button } from 'react-native';

const NavBar = (props) => {

    const showBarcode = (show) => {
        if(show)
            return (
                <View style={styles.blackBg} >
                    <View style={styles.barcodeView}>
                        <Image style={styles.barcode} source={{uri:`https://barcode.tec-it.com/barcode.ashx?data=${props.barcode}&code=&multiplebarcodes=false&translate-esc=true&unit=Fit&dpi=400&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&codepage=Default&qunit=Mm&quiet=0`}}/>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Scan this code with your Barista</Text>
                        <TouchableOpacity style={{marginTop:10, borderRadius: 4, borderColor: 'black', borderWidth: 2, padding:10, alignItems:'center', width: '100%', }} activeOpacity={0.5} onPress={props.onScanPress}> 
                            <Text style={{fontSize:15, fontWeight:'bold'}}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
    }


    return (
        <>
            <View style={styles.navBar}>
                <TouchableOpacity activeOpacity={0.5}> 
                    <Image style={styles.homeIcon} source={require('../assets/home_icon.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={props.onScanPress}>
                    <Image style={styles.scanIcon} source={require('../assets/scan_icon.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}>
                    <Image style={styles.moreIcon} source={require('../assets/more_icon.png')}/>
                </TouchableOpacity>
            </View>
            {showBarcode(props.barcodeShowed)}
        </>
    );
}

const styles = StyleSheet.create({
    barcode: {
        width:'85%',
        flex:1,  
        resizeMode:'contain', 
        alignSelf:'center'
    },

    barcodeView: { 
        padding:30, 
        width:'85%',
        flex:0.4,
        backgroundColor:'white', 
        alignSelf:'center',
        alignItems:'center',
        borderRadius: 10,
        justifyContent: 'space-between',
    },

    blackBg: {
        justifyContent:'center',
        position:'absolute', 
        padding:20, 
        width:'100%', 
        height:Dimensions.get('window').height, 
        backgroundColor:'rgba(0, 0, 0, 0.87)', 
        alignSelf:'center'
    },

    homeIcon: {
        width:40, 
        height:40, 
        resizeMode: 'contain'
    },

    moreIcon: {
        width: 33,
        height: 33,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    
    scanIcon: {
        width: 65,
        height: 65,
        alignSelf: 'center',
        resizeMode: 'contain',
    },

	navBar: {
        height:70, 
        marginHorizontal:15, 
        borderTopColor: 'white', 
        borderTopWidth:1.5, 
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

});

export default NavBar;