import React from 'react';
import topView from 'rn-topview';

export default function a({
  Component,
  params = {}
}) {

  const onClose = (visible) => {
    if (!visible) {
      console.log('close')
      topView.remove();
    }
  };

  topView.set(
    <Component
      params={ params }
      onClose={ onClose }
    />
  );
}