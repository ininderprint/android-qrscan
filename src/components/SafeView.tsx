import React, { Component } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-navigation';

import { observer } from 'mobx-react';

interface SafeViewProps extends SafeAreaViewProps {}

@observer
class SafeView extends Component<SafeViewProps> {
  render() {
    return (
      <SafeAreaView {...this.props}>
        {this.props.forceInset && this.props.forceInset.top !== 'never' && Platform.OS === 'android' && (
          <View style={{ height: StatusBar.currentHeight || 20 }} />
        )}
      </SafeAreaView>
    );
  }
}
export default SafeView;
