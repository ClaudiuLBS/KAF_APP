import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, ImageBackground} from 'react-native';
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';


class App extends React.Component {

	ranks = ['-','DEPENDENT', 'MAESTRU', 'AVANSAT', 'AMATOR', 'INCEPATOR'] 

	constructor(props){  
		super(props);  
		this.state = {
			isLoading: true,
			page: 1,
			barcodeShowed: false,
		}  
	} 

	handleBarcode = () => {
		this.setState({barcodeShowed: !this.state.barcodeShowed})
	}

	componentDidMount() {
		return fetch('http://10.0.2.2:8000/api/consumer/9/')
		  	.then(response => response.json())
		  	.then(dataJson => {
				this.setState(
					{
						isLoading: false,
						data: dataJson,
					},
				)
			})
		  	.catch(error => {
				console.error(error);
			}
		);
	}

	render() { 
		if (this.state.isLoading)
			return(
				<Text>Loading...</Text>
			);
		else
			return(
				<SafeAreaView style={styles.container}>
					<StatusBar/>
					<ImageBackground source={require('./assets/background.png')} style={styles.image}>
						<MainPage
							username={this.state.data.username}
							freeCoffees={this.state.data.gold}
							rang={this.ranks[this.state.data.rank]}
							rangulUrmator={this.ranks[this.state.data.rank-1]}
							rankProgress={this.state.data.rank_progres}
							silverRequiredForRank={this.state.data.silver_required_for_rank}
							silverRequiredForGold={this.state.data.silver_required_for_gold}
							silver={this.state.data.silver}
							referralCode={this.state.data.referral_code}
							friends={this.state.data.friends}
							goldFromFriends={this.state.data.gold_made_from_friends}
						/>
						<NavBar
							barcode={this.state.data.bar_code}
							onScanPress={() => this.handleBarcode()}
							barcodeShowed={this.state.barcodeShowed}
						/>
					</ImageBackground>
				</SafeAreaView>
			);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
	},
});

export default App;