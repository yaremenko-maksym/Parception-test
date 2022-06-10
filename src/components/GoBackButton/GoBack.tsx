import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './GoBack.module.scss';

export const GoBack: React.FC = memo(() => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={styles.goBack}
    >
      Back
    </button>
  );
});
