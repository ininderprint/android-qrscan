import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal, Button, DatePickerIOS } from 'react-native';
import { observable, action } from 'mobx';
import { observer, propTypes } from 'mobx-react';
import { M, fpx, px } from '../index';
import moment from 'dayjs'

@observer
class DateTimePickerModal extends React.Component {

  // static defaultProps = {
  //   mode: PropTypes.oneOf(['time', 'date', 'datetime']),
  //   minDate: PropTypes.object,
  //   maxDate: PropTypes.object,
  //   value: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.object
  //   ])
  // }  

  @observable modalVisible = false
  @observable value = new Date()
  @observable mode = 'time'
  @observable minDate = new Date('1970-01-01')
  @observable maxDate = new Date('2030-12-30')

  componentDidMount() {
    this.open(this.props)
  }

  @action open(params) {
    this.mode = params.mode || 'time'
    this.minDate = params.minDate || new Date('1970-01-01')
    this.maxDate = params.maxDate || new Date('2030-12-30')
    this.value = params.value || new Date()
    this.modalVisible = true
    this.params = params
  }

  @action close = () => {
    this.modalVisible = false
    if (this.props.onClose) this.props.onClose(this.modalVisible)
  }

  @action handleChange = (val) => {
    this.value = val
  }

  handleSubmit = () => {
    let params = this.props
    if (params.onChange && this.value) {
      params.onChange(
        moment(this.value).format(
          params.mode === 'time' ? 'HH:mm' :
          params.mode === 'datetime' ? 'YYYY-MM-DD HH:mm' :
          params.mode === 'date' ? 'YYYY-MM-DD' : ''
        ),
        this.value
      )
    }
    this.close()
  }

  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.modalVisible}
        onRequestClose={ this.close }
      >
        <View style={[M["flex-item"], M["vertical-bottom"], { backgroundColor: 'rgba(0,0,0,0.4)', width: '100%' }]}>
          <View style={{ width: '100%' }}>
            <View style={[ M["flexbox-horizontal"], M["vertical-middle"], M["p-h-b-10"], M["b-c-w"], M["p-v-b-5"], { width: '100%' } ]}>
              <Button
                onPress={ this.close }
                title="取消"
              />
              {/* <Button type="ghost" onClick={ this.close }>取消</Button> */}
              <View style={ M["flex-item"] }></View>
              <Button
                onPress={this.handleSubmit }
                title="确定"
              />
            </View>
            <View style={[{ width: '100%' }, M["flexbox-vertical"], M["center-all"], M["b-c-e"]]}>
              {/* <DatePickerView
                mode={this.mode}
                minDate={this.minDate}
                maxDate={this.maxDate}
                value={this.value}
                minuteStep={5}
                onChange={this.handleChange}
              /> */}
              { this.modalVisible && <DatePickerIOS
                style={{ flex: 1 }}
                minuteInterval={ 5 }
                mode={ this.mode }
                date={ this.value }
                minimumDate={ this.minDate }
                maximumDate={ this.maxDate }
                onDateChange={ this.handleChange }
              />}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default DateTimePickerModal