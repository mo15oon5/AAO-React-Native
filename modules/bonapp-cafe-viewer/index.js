// @flow
import * as React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import * as c from '@frogpond/colors'
import {Toolbar, ToolbarButton} from '@frogpond/toolbar'
import {type NavigationScreenProp} from 'react-navigation'
import {CccBonAppMenu} from '@frogpond/ccc-bonapp-menu'

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	default: {
		height: 44,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: c.black,
		flex: 1,
		fontSize: 13,
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
})

type Props = {
	navigation: NavigationScreenProp<*>,
}

type State = {
	cafeId: string,
}

export class BonAppCafeViewer extends React.PureComponent<Props, State> {
	state = {
		cafeId: '34',
	}

	chooseCafe = (cafeId: string) => {
		if (!/^\d*$/.test(cafeId)) {
			return
		}
		this.setState(() => ({cafeId}))
	}

	render() {
		return (
			<View style={styles.container}>
				<Toolbar onPress={() => {}}>
					<TextInput
						keyboardType="numeric"
						onBlur={this.chooseCafe}
						onChangeText={this.chooseCafe}
						style={styles.default}
						value={this.state.cafeId}
					/>
					<ToolbarButton isActive={true} title="Go" />
				</Toolbar>
				<CccBonAppMenu
					key={this.state.cafeId}
					cafe={{id: this.state.cafeId}}
					loadingMessage={['Loading…']}
					name="BonApp"
					navigation={this.props.navigation}
				/>
			</View>
		)
	}
}