import React from 'react';
import styles from './index.module.less';
import Navbar from '@/components/Navbar';
import CloudRemoval from '@/components/CloudRemoval';

const Home = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <CloudRemoval />
      </div>
    </div>
  );
};

export default Home;
