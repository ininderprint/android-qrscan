import React from 'react';
import { StyleSheet, View, Text,  TouchableOpacity, TextInput, Image, TextInputComponent, TextInputProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { M, fpx, px } from '@/components/mengti-ui/react-native';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import omit from 'omit.js';

export interface InputProps extends TextInputProps {
  type?: 'text' | 'number' | 'idcard' | 'digit';
  inputStyle?: StyleProp<ViewStyle>;
  onChange?: (value: string) => void;
}

@observer
export class Input extends React.Component<InputProps> {
  private RefsInput: TextInput | null = null;
  @observable value = '';

  render() {
    let keywordType: TextInputProps['keyboardType'] = undefined;
    const { type } = this.props;
    if (type === 'number' || type === 'idcard') keywordType = 'number-pad';
    return (
      <View style={[styles.view, M['flexbox-horizontal']]}>
        <TextInput
          placeholderTextColor='#999'
          onChangeText={this.handleInputChange}
          underlineColorAndroid='transparent'
          enablesReturnKeyAutomatically={true}
          returnKeyType='next'
          selectionColor='#333'
          keyboardType={keywordType}
          textAlignVertical='center'
          style={[styles.input, this.props.inputStyle || {}]}
          ref={(e) => (this.RefsInput = e)}
          {...omit(this.props, ['inputStyle', 'onChange'])}
        />
        {/* {!!this.props.value && (
          <TouchableOpacity onPress={this.clear} style={[M['p-h-b-10'], M['center-all']]}>
            <Image source={require('./images/clear.png')} style={ styles.clear_button__img } />
          </TouchableOpacity>
        )} */}
      </View>
    );
  }

  @action handleInputChange = (val: string) => {
    if (this.props.onChange) this.props.onChange(val);
  }

  @action clear = () => {
    this.RefsInput && this.RefsInput.clear();
    if (this.props.onChange) this.props.onChange('');
  };
}

export default Input;

const styles = StyleSheet.create({
  view: {
    height: px(58),
    backgroundColor: '#f6f6f6',
    borderRadius: px(40),
    borderWidth: px(1),
    borderColor: '#c7ccdc',
    paddingHorizontal: px(18)
  },
  input: {
    fontSize: px(30),
    paddingTop: px(4),
    paddingBottom: px(4),
    flex: 1,
  },
  clear_button__img: {
    width: px(40),
    height: px(40),
  },
});
