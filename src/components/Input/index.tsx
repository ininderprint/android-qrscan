import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  TextInputComponent,
  TextInputProps,
} from 'react-native';
import {M, fpx, px} from '../mengti-ui/react-native';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

export interface InputProps extends TextInputProps {
  inputStyle?: any;
  onChangeText?: (val: string) => void;
}

@observer
class Input extends React.Component<InputProps> {
  private RefsInput: TextInput | null = null;
  @observable value = '';

  render() {
    return (
      <View style={[{position: 'relative', flex: 1}, M['flexbox-horizontal']]}>
        <TextInput
          placeholderTextColor="#666"
          onChangeText={this.handleInputChange.bind(this)}
          underlineColorAndroid="transparent"
          enablesReturnKeyAutomatically={true}
          returnKeyType="next"
          selectionColor="#333"
          style={[styles.input, this.props.inputStyle || {}]}
          ref={e => (this.RefsInput = e)}
          {...this.props}
        />
        {!!this.value && (
          <TouchableOpacity
            onPress={this.clear}
            style={[M['p-h-b-10'], M['center-all']]}>
            {/* <Image source={ require('./images/clear.png') } style={ styles.clear_button__img } /> */}
          </TouchableOpacity>
        )}
      </View>
    );
  }

  @action handleInputChange(val: string) {
    this.value = val;
    if (this.props.onChangeText) this.props.onChangeText(val);
  }

  @action clear = () => {
    this.RefsInput && this.RefsInput.clear();
    this.value = '';
    if (this.props.onChangeText) this.props.onChangeText('');
  };
}

export default Input;

const styles = StyleSheet.create({
  input: {
    fontSize: fpx(28),
    paddingTop: px(5),
    paddingBottom: px(5),
    flex: 1,
  },
  clear_button__img: {
    width: px(40),
    height: px(40),
  },
});
