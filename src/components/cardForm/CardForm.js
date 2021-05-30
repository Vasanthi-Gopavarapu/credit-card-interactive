import { useState } from 'react';
import './CardForm.css';
import { DEFAULT_CVC_LENGTH } from '../../utils/cardTypes';

const monthArr = Array.from({length: 12}, (v,x) => {
const month = x+1;
return month <= 9 ? '0'+ month : month;
});

const currentYear = new Date().getFullYear();

const yearArr = Array.from({length: 10}, (v,x) => {
    return currentYear + x;
})

function CardForm (props) {

    const card = props.card;

    const [cardNumber, setCardNumber] = useState('');
    const [cardCvv, setcardCvv] = useState('');

    const onCardNumberChange = (e) => {
        let { name, value } = e.target;
        value = value.replace(/\D/g, '');

        if (/^3[47]\d{0,13}$/.test(value)) { //Amex 15 digits
            value = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        }else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
            // diner's club, 14 digits
            value = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        }else if(/^\d{0,16}$/.test(value)) { //visa, masterCard, discover,jcb 16 digits
            value = value
            .replace(/(\d{4})/, '$1 ')
            .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
            .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
        }

        setCardNumber(value.trimRight());
        props.updateCardState(name, value);
    }

    const onCvvChange = (e) => {
        let { name, value } = e.target;
        value = value.replace(/\D/g, '');
        setcardCvv(value);
        props.updateCardState(name, value);
    }

    const onElementChange = (e) => {
        const { name, value } = e.target;
        props.updateCardState(name, value);
    }

    const onCvvFocus = () => {
        props.updateCardState('isCardFlipped', true);
    }

    const onCvvBlur = () => {
        props.updateCardState('isCardFlipped', false)
    }
    
    return (
        <div className="Card">
            <div className="card-list">{props.children}</div>
            <form className="card-form">
                <div className="form-group">
                    <label htmlFor="cardNumber" >Card Number</label>
                    <input name="cardNumber"
                        value={cardNumber}
                        onChange={onCardNumberChange}
                        ref={props.cardNumberRef}
                        onFocus={(e) => props.onCardInputFocus(e, 'cardNumber')}
                        onBlur={props.onCardInputBlur}
                        maxLength="19"
                        className="form-control" type="tel"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="cardHolder" >Card Holder</label>
                    <input name="cardHolder"
                        value={card.cardHolder}
                        onChange={onElementChange}
                        ref={props.cardHolderRef}
                        onFocus={(e) => props.onCardInputFocus(e, 'cardHolder')}
                        onBlur={props.onCardInputBlur}
                    className="form-control" type="text"></input>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="cardMonth" >Expiration Date</label>
                            <div className="row">
                                <div className="col">
                                <select name="cardMonth" 
                                value={card.cardMonth}
                                onChange={onElementChange}
                                ref={props.cardDateRef}
                                onFocus={(e) => props.onCardInputFocus(e, 'cardDate')}
                                onBlur={props.onCardInputBlur}
                                className="form-control select-control" >
                                    <option value="" disabled>Month</option>
                                    {monthArr.map((val, index) => {
                                       return <option key={index} value={val}>{val}</option>
                                    })}
                                    </select></div>
                                <div className="col">
                                <select name="cardYear"
                                value={card.cardYear}
                                onChange={onElementChange}
                                ref={props.cardDateRef}
                                onFocus={(e) => props.onCardInputFocus(e, 'cardDate')}
                                onBlur={props.onCardInputBlur}
                                className="form-control select-control">
                                    <option value="" disabled>Year</option>
                                    {yearArr.map((val, index) => {
                                       return <option key={index} value={val}>{val}</option>
                                    })}
                                    </select></div>
                            </div>
                        </div>
                        
                        <div className="col">
                            <label htmlFor="cvv">CVV</label>
                            <input name="cardCvv" 
                            value={cardCvv}
                            onChange={onCvvChange}
                            ref={props.cardCvvRef}
                            onFocus={onCvvFocus}
                            onBlur={onCvvBlur}
                            maxLength={DEFAULT_CVC_LENGTH}
                            className="form-control"
                            type="tel"></input>
                        </div>
                    </div>
                    
                </div>
                <div className="btn-submit">
                    <button type="submit" className="btn btn-primary"> Submit</button>
                </div>   
                
            </form>
        </div>
    )
}

export default CardForm;