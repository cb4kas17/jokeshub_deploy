import React from 'react';
import styles from '../Layout/container.module.css';
function Container(props) {
    return <div className={styles.container}>{props.children}</div>;
}

export default Container;
