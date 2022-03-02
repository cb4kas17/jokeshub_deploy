import React from 'react';

import styles from './modal.module.css';
function Modal(props) {
    return <div className={`${styles.modalContainer} ${props.className}`}>{props.children}</div>;
}

export default Modal;
