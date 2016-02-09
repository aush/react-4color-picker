import React from 'react';
import { Vertical, Horizontal } from 'react-stack';
import indexof from 'lodash.indexof';
import zipobject from 'lodash.zipobject';
import map from 'lodash.map';
import range from 'lodash.range';
import times from 'lodash.times';
import flatten from 'lodash.flatten';
import CSSModules from 'react-css-modules';
import styles from './colorpicker.styl';

const ColorPicker = ({ palette, selected, onSelect, ...rest }) => {
  const selectedIndex = indexof(palette, selected);
  const classNames = zipobject(
    map(range(selectedIndex, selectedIndex + 4), i => i % 4),
    flatten(times(2, () => ['height-transitioned', ''])));

  const cell = i =>
    <div
      className={classNames[i]}
      grow={selectedIndex % 2 ^ i % 2}
      style={{ background: palette[i] }}
      onClick={() => onSelect(palette[i])}
    />;

  const column = cells => {
    const grow = !!cells[0] ^ selectedIndex > 1;
    return (
      <Vertical grow={grow} className={grow ? 'vertical' : 'width-transitioned'}>
        {cell(cells[0])}
        {cell(cells[1])}
      </Vertical>
    );
  };

  return (
    <Horizontal className="container" {...rest}>
      {column([0, 1])}
      {column([2, 3])}
    </Horizontal>
  );
};

export default CSSModules(ColorPicker, styles);
