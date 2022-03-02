import { useReducer } from 'react';

const defaultValue = {
    value: '',
    isTouched: false,
};
const useInput = (validateValue) => {
    const inputStateReducer = (state, action) => {
        if (action.type === 'INPUT_CHANGE') {
            return { value: action.value, isTouched: state.isTouched };
        }
        if (action.type === 'FOCUS_CHANGE') {
            return { value: state.value, isTouched: true };
        }
        if (action.type === 'RESET') {
            return { value: '', isTouched: false };
        }
        return defaultValue;
    };

    const [inputState, dispatchInputState] = useReducer(inputStateReducer, defaultValue);

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatchInputState({
            type: 'INPUT_CHANGE',
            value: event.target.value,
        });
    };
    const inputBlurHandler = (event) => {
        dispatchInputState({
            type: 'FOCUS_CHANGE',
        });
    };

    const reset = () => {
        dispatchInputState({
            type: 'RESET',
            value: '',
        });
    };
    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    };
};

export default useInput;
