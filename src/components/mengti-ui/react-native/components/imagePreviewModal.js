import React from 'react';
import { View, Modal, Button } from 'react-native';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { M, fpx, px } from '../index';

// import ImageViewer from 'react-native-image-zoom-viewer'

@observer
class ImagePreviewModal extends React.Component {

  @observable modalVisible = false
  @observable index = 0
  @observable images = [
    // { url: 'https://file.mengti.cc/FoVh3_1Tny3ZcdUDw8ysUL_PSkoH?imageView2/0/w/847/h/640/format/jpg' },
    // { url: 'https://file.mengti.cc/FsbJZUZY5be_Oo7XeUSHrD_sJLss?imageView2/0/w/847/h/640/format/jpg' }
  ]

  componentDidMount() {
    this.open(this.props.params)
  }

  @action open(params) {
    this.modalVisible = true
    this.params = params
    let { images, index, image } = params
    this.images = images.map((item, i) => {
      if (image && item === image) index = i
      return { url: item }
    })
    this.index = index
  }

  @action close = () => {
    this.modalVisible = false
    if (this.props.onClose) this.props.onClose(this.modalVisible)
  }

  render() {
    return (
      <Modal
        animationType={ "fade" }
        transparent={ true }
        visible={ this.modalVisible }
        onRequestClose={ this.close }
      >
        <ImageViewer
          index={ this.index }
          imageUrls={ this.images }
          enableSwipeDown={ true }
          onSwipeDown={ this.close }
          onClick={ this.close }
        />
      </Modal>
    );
  }
}

export default ImagePreviewModal