import React from 'react';
import { observer } from "mobx-react"
import { observable } from 'mobx';
import { View } from 'react-native';
import { Overlay } from 'teaset';

import { px } from '@/utils';
import { CrossPageNavigation } from './PropType';

/**
 * Modal
 */
export interface ModalProps<C extends React.Component> {
  visible?: boolean;
  children?: React.ReactNode;
  /** 点击蒙层是否允许关闭	 */
  maskClosable?: boolean;
  animate?: 'fade' | 'pop' | 'slide-bottom' | 'slide-top' | 'slide-left' | 'slide-right';
  renderView?: (props: C['props']) => React.ReactNode;
  /**
   * PC 中使用
   */
  width?: number | string;
  height?: number | string;
  zIndex?: number;
  onClose?: () => void;
}

@observer
export class Modal<C extends React.Component> extends React.Component<ModalProps<C>> {

  @observable childrenProps: C['props'] = {};
  @observable visible = false;

  navigation: CrossPageNavigation = {
    goBack: () => {
      this.close();
    },
    navigate: (pageName, params) => {

    },
    redirect: (pageName, params) => {

    }
  }

  overlayView: any;
  overlayViewKey?: string;
  open = (childrenProps: C['props'] = {}) => {
    this.childrenProps = {
      isModal: true,
      navigation: this.navigation,
      ...childrenProps
    };
    let {
      children,
      maskClosable = true,
      animate = 'slide-bottom',
      renderView,
      width,
      height,
      zIndex,
      onClose,
      ...other
    } = this.props;
    let style = {
      width,
      height
    };
    let horizontal = 'center';
    let vertical = 'middle';
    if (animate === 'slide-bottom') {
      vertical = 'bottom';
    }
    if (animate === 'slide-left') {
      horizontal = 'left';
    }
    if (animate === 'slide-right') {
      horizontal = 'right';
    }
    const alignItems = horizontal === 'center' ? 'center' : `flex-${horizontal === 'left' ? 'start' : 'end'}`;
    const justifyContent = vertical === 'middle' ? 'center' : `flex-${vertical === 'top' ? 'start' : 'end'}`;
    let OverlayViewComponent = animate === 'fade' ? Overlay.PopView : animate === 'pop' ? Overlay.PopView : Overlay.PullView;
    // slide
    const side = animate === 'slide-left' ? 'left' :
                animate === 'slide-right' ? 'right' :
                animate === 'slide-top' ? 'top' :
                animate === 'slide-bottom' ? 'bottom' : undefined
    let overlayView = (
      <OverlayViewComponent
        style={{ alignItems, justifyContent, width: px(1920), height }}
        containerStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
        animated
        side={side}
        modal={!maskClosable}
        overlayOpacity={0.4}
        ref={(v: any) => (this.overlayView = v)}>
        <View style={style}>
          { children || null }
          { renderView && renderView(this.childrenProps) }
        </View>
      </OverlayViewComponent>
    );
    this.overlayViewKey = Overlay.show(overlayView);
    console.log('[this.overlayViewKey] ', this.overlayViewKey)
  }

  close = () => {
    this.childrenProps = {};
    this.visible = false;
    if (this.overlayViewKey) {
      Overlay.hide(this.overlayViewKey);
    }
  }

  render() {
    return (
      <View />
    );
  }
}

export default Modal;
