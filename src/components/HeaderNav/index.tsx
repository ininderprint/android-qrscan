import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
  Platform,
  RefreshControl,
  FlatList,
} from 'react-native';
import { M, fpx, px } from '@/components/mengti-ui/react-native';
import SafeView from '@/components/SafeView';
import mainStore from '@/store/main';
import { observer, propTypes } from 'mobx-react';
import NavigationService from '@/utils/Navigation';
import PropsTypes from 'prop-types';
import PropTypes from 'prop-types';
const DarkBackIcon = () => <Image source={require('./images/back_light.png')} style={{ width: px(24), height: px(42) }} />;
const LightBackIcon = () => <Image source={require('./images/back_dark.png')} style={{ width: px(24), height: px(42) }} />;

interface IProps {
  mode?: 'dark' | 'light';
  backgroundColor?: string;
  imageBackground?: boolean;
  title?: string | React.ReactNode;
  translucent?: boolean;
  leftContent?: string | React.ReactNode;
  rightContent?: string | React.ReactNode;
  loginIcon?: boolean;
  onBack?: () => void;
  bottomContent?: React.ReactNode;
}

@observer
class HeaderBar extends React.Component<IProps> {
  static propTypes = {
    mode: PropTypes.oneOf(['dark', 'light']),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    translucent: PropTypes.bool,
    imageBackground: PropTypes.bool,
    leftContent: PropTypes.element,
    rightContent: PropTypes.element,
    loginIcon: PropTypes.bool,
    onBack: PropTypes.func,
  };

  handleBack() {
    if (this.props.onBack) return this.props.onBack();
    NavigationService.goBack();
  }

  render() {
    let { mode = 'dark', backgroundColor, imageBackground, title, translucent, leftContent, rightContent, loginIcon } = this.props;
    const titleEle = title || this.props.children;
    const bgColor = backgroundColor ? backgroundColor : mode === 'dark' ? '#353535' : '#fff';

    const Container: any = imageBackground ? ImageBackground : View;

    return (
      <Container source={require('./images/header_bg.png')} style={[styles.bar, { backgroundColor: translucent ? '' : bgColor }]}>
        <StatusBar backgroundColor='rgba(0,0,0,0)' translucent={true} barStyle={mode === 'light' ? 'dark-content' : 'light-content'} />
        <SafeView forceInset={{ top: 'always', bottom: 'never' }} />
        <View style={[styles.body, M['flexbox-horizontal'], M['vertical-middle']]}>
          <View style={[styles.left, M['flexbox-horizontal']]}>
            {leftContent ? (
              leftContent
            ) : (
              <TouchableOpacity
                activeOpacity={1}
                onPress={this.handleBack.bind(this)}
                style={[styles.back_button, loginIcon ? styles.back_button_login : null, M['center-all']]}
              >
                {mode === 'dark' ? <DarkBackIcon /> : <LightBackIcon />}
              </TouchableOpacity>
            )}
          </View>
          <View style={[M['center-all'], M['flex-item']]}>
            {typeof titleEle === 'string' ? (
              <Text
                style={[
                  {
                    color: mode === 'dark' ? '#fff' : '#333',
                    fontWeight: 'bold',
                  },
                  M['f-s-16'],
                ]}
              >
                {titleEle}
              </Text>
            ) : (
              titleEle
            )}
          </View>
          <View style={[styles.right, M['flexbox-horizontal']]}>{rightContent}</View>
        </View>
        <View>{this.props.bottomContent}</View>
      </Container>
    );
  }
}

export default HeaderBar;

const styles = StyleSheet.create({
  bar: {},
  body: {
    position: 'relative',
    minHeight: px(88),
  },
  left: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },
  right: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },
  back_button: {
    paddingLeft: px(30),
    paddingRight: px(30),
  },
  back_button_login: {
    paddingLeft: px(50),
    paddingRight: px(50),
  },
});
