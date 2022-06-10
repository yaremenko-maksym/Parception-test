import React, { memo } from 'react';
import classNames from 'classnames';

import './Loader.scss';

type Props = {
  size: 'small' | 'big';
};

export const Loader: React.FC<Props> = memo(({
  size,
}) => (
  <div className="Loader">
    <div className={classNames(
      'Loader__content',
      { 'Loader__content--small': size === 'small' },
      { 'Loader__content--big': size === 'big' },
    )}
    />
  </div>
));
