import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './components/card/Card';
import CardForm from './components/cardForm/CardForm'
import React, { useState, useCallback, useRef } from 'react';

const initialState = {
  cardNumber: '#### #### #### ####',
  cardHolder: '',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
  isCardFlipped: false
}

function App () {

  const [state, setState] = useState(initialState);
  const [focusedEle, setFocusedEle] = useState(null);
  

  const focusFormFieldsRefObj = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
    cardCvv: useRef()
  }

  const focusCardFieldsRefObj = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef()
  }
  
  const updateCardState = useCallback(
    (name, value) => {
      setState({
        ...state,
        [name]: value
      })
    }, [state]);

  const onCardInputFocus = (e, inputName) => {
    const refName = focusCardFieldsRefObj[inputName]
    setFocusedEle(refName);
  }

  const onCardInputBlur = () => {
    setFocusedEle(null);
  }

  const focusEleByKeyName = (name) => {
      focusFormFieldsRefObj[name].current.focus();
  };

  return (
      <div className="App-wrapper">
        <CardForm card={state}
          updateCardState={updateCardState}
          cardNumberRef={focusFormFieldsRefObj.cardNumber}
          cardHolderRef={focusFormFieldsRefObj.cardHolder}
          cardDateRef={focusFormFieldsRefObj.cardDate}
          cardCvvRef={focusFormFieldsRefObj.cardCvv}
          onCardInputFocus={onCardInputFocus}
          onCardInputBlur={onCardInputBlur}
        >
          <Card card={state}
          currentFocusElement={focusedEle}
          onCardEleClick={focusEleByKeyName}
          cardNumberRef={focusCardFieldsRefObj.cardNumber}
          cardHolderRef={focusCardFieldsRefObj.cardHolder}
          cardDateRef={focusCardFieldsRefObj.cardDate}
          ></Card>
        </CardForm>
        
      </div>
    );
  
}

export default App;
