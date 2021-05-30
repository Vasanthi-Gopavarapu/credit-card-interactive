import './Card.css';
import { getCardType } from '../../utils/cardTypes';
import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';

const CARD_BG = 6;

function Card (props) {
    const card = props.card;
    const [style, setStyle] = useState(null);
    

    const cardType = getCardType(card.cardNumber); 
    //console.log(cardType);

    const hideCardNumber = (cardNum) => {
        let cardNumArr = cardNum.split('');
        if(/^\d/.test(cardNum)){
            cardNumArr.forEach((val, i) => {
                if(i > 4 && i < 14){
                    if(cardNumArr[i] !== ' '){
                        cardNumArr[i] = '*'
                    }
                }
            })
        }  
        return cardNumArr;
    }

    useEffect(()=> {
        if(props.currentFocusElement){
            let element = props.currentFocusElement.current;
            element
            ? setStyle({
                  width: `${element.offsetWidth}px`,
                  height: `${element.offsetHeight}px`,
                  transform: `translateX(${element.offsetLeft}px) translateY(${element.offsetTop}px)`
              })
            : setStyle(null);
        }
    }, [props.currentFocusElement])

    return (
        <div className={`Card-item ${card.isCardFlipped? 'active':''}`}>
            {/* Card front-side */}
            <div className="Front-side">
                <div className={`Card-ele-focus ${props.currentFocusElement? 'active' : ''} `}
                    style={style} />
                <div className="Cover">
                        <img
                            alt=""
                            src={`images/${CARD_BG}.jpeg`}
                            className="Card-bg"
                        />
                </div>
                <div className="Wrapper">
                    <div className="Top-items">
                        <img 
                        alt=""
                        src="images/chip.png" 
                        style={{width: '60px'}}/>
                        <div className="Card-type">
                            <img 
                            alt={cardType}
                            src={`images/${cardType}.png`}
                            className="Cardtype-img" />
                        </div>
                    </div>
                    <label className="Card-numb"
                        ref={props.cardNumberRef}
                        onClick={() => props.onCardEleClick('cardNumber')}
                        >
                            <TransitionGroup className="Slide-up" component="div">
                                { card.cardNumber ? 
                                (hideCardNumber(card.cardNumber).map((val, index) => 
                                    ( <CSSTransition classNames="Slide-up"
                                        timeout={250} key={index}>
                                            <div className="Cardnumb-item">
                                                {val}
                                            </div>
                                        </CSSTransition>)

                                )) : (<CSSTransition classNames="Slide-up" timeout={250}>
                                    <div className="Cardnumb-item">#
                                    </div> 
                                        </CSSTransition>)
                                }
                            </TransitionGroup>
                    </label>
                    <div className="Content" >

                        <label className="Card-holder"
                        ref={props.cardHolderRef}
                        onClick={() => props.onCardEleClick('cardHolder')}
                        >
                            <div className="Cardholder-title">Card Holder</div>
                            <div className="Holder-name">
                                <TransitionGroup className="Slide-up" component="div">
                                    {card.cardHolder?
                                        card.cardHolder.split('').map((val, index) => (
                                            <CSSTransition classNames="Slide-up" timeout={250} key={index}>
                                                <div className="Holdername-item">{val}</div>
                                            </CSSTransition>
                                        )) : (
                                            <CSSTransition classNames="Slide-up" timeout={250}>
                                                <div>FULL NAME</div>
                                            </CSSTransition>
                                        )
                                    }
                                </TransitionGroup>
                            </div>
                        </label>
                        <div className="Card-date"
                        onClick={() => props.onCardEleClick('cardDate')}
                        ref={props.cardDateRef} >
                            <div className="Date-title">Expires</div>
                            <label className="Date-item">
                                <SwitchTransition in-out>
                                    <CSSTransition
                                        classNames="Slide-up"
                                        timeout={250}
                                        key={card.cardMonth}
                                    >
                                        <span>
                                            {!card.cardMonth ? 'MM' : card.cardMonth}
                                        </span>
                                    </CSSTransition>
                                </SwitchTransition>
                            </label>
                            /
                            <label className="Date-item">
                                <SwitchTransition in-out>
                                    <CSSTransition
                                        classNames="Slide-up"
                                        timeout={250}
                                        key={card.cardYear}
                                    >
                                        <span>
                                            {!card.cardYear ? 'YY': card.cardYear.toString().substr(-2)}
                                        </span>
                                    </CSSTransition>
                                </SwitchTransition>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {/* Card back-side */}
            <div className="Back-side">
                <div className="Back-cover">
                    <img
                        alt=""
                        src={`images/${CARD_BG}.jpeg`} 
                        className="Card-bg"/>
                </div>
                <div className="Black-bar" />
                <div className="Cvv-content">
                    <div className="Cvv-title">CVV</div>
                    <div className="Cvv-bar">
                        <TransitionGroup>
                            {card.cardCvv.split('').map((val, index) => (
                                <CSSTransition classNames="Zoom-in-out" timeout={250} key={index}>
                                    <span>*</span>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </div>
                    <div className="Card-type">
                        <img
                            alt={cardType}
                            src={`images/${cardType}.png`}
                            className="TypeImg"
                        />
                    </div>
                </div>
            </div>                      
        </div>
    );
}

export default Card;