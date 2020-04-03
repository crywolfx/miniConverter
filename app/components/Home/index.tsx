import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.css';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Link to="/counter">to Counter</Link>
    </div>
  );
}
