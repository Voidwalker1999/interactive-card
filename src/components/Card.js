import React, { useRef, useState, useEffect } from 'react';
import './Card.css';

const Card = (props) => {
 const { labels, fields, isCardNumberMasked, randomBackgrounds, backgroundImage } = props;

 const [focusElementStyle, setFocusElementStyle] = useState(null);
 const [currentFocus, setCurrentFocus] = useState(null);
 const [isFocused, setIsFocused] = useState(false);
 const [isCardFlipped, setIsCardFlipped] = useState(false);
 const [currentPlaceholder, setCurrentPlaceholder] = useState('');

 useEffect(() => {
    changePlaceholder();

    let fields = document.querySelectorAll('[data-card-field]');
    fields.forEach(element => {
      element.addEventListener('focus', () => {
        setIsFocused(true);
        if (element.id === fields.cardYear || element.id === fields.cardMonth) {
          setCurrentFocus('cardDate');
        } else {
          setCurrentFocus(element.id);
        }
        setIsCardFlipped(element.id === fields.cardCvv);
      });
      element.addEventListener('blur', () => {
        setIsCardFlipped(!element.id === fields.cardCvv);
        setTimeout(() => {
          if (!isFocused) {
            setCurrentFocus(null);
          }
        }, 300);
        setIsFocused(false);
      });
    });
 }, []);

 useEffect(() => {
    if (currentFocus) {
      changeFocus();
    } else {
      setFocusElementStyle(null);
    }
 }, [currentFocus]);

 useEffect(() => {
    changePlaceholder();
 }, [labels.cardNumber]);

 const changeFocus = () => {
    let target = document.getElementById(currentFocus);
    setFocusElementStyle({
      width: `${target.offsetWidth}px`,
      height: `${target.offsetHeight}px`,
      transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
    });
 };

 const getIsNumberMasked = (index, n) => {
    return index > 4 && index < 14 && labels.cardNumber.length > index && n.trim() !== '' && isCardNumberMasked;
 };

 const changePlaceholder = () => {
    let cardType = '';
    let number = labels.cardNumber;
    let re = new RegExp('^4');
    if (number.match(re) != null) cardType = 'visa';

    re = new RegExp('^(34|37)');
    if (number.match(re) != null) cardType = 'amex';

    re = new RegExp('^5[1-5]');
    if (number.match(re) != null) cardType = 'mastercard';

    re = new RegExp('^6011');
    if (number.match(re) != null) cardType = 'discover';

    re = new RegExp('^62');
    if (number.match(re) != null) cardType = 'unionpay';

    re = new RegExp('^9792');
    if (number.match(re) != null) cardType = 'troy';

    re = new RegExp('^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}');
    if (number.match(re) != null) cardType = 'dinersclub';

    re = new RegExp('^35(2[89]|[3-8])');
    if (number.match(re) != null) cardType = 'jcb';

    if (cardType === 'amex') {
      setCurrentPlaceholder('#### ###### #####');
    } else if (cardType === 'dinersclub') {
      setCurrentPlaceholder('#### ###### ####');
    } else {
      setCurrentPlaceholder('#### #### #### ####');
    }
    setCurrentPlaceholder(currentPlaceholder);
 };

 const currentCardBackground = () => {
    if (randomBackgrounds && !backgroundImage) { // TODO will be optimized
      let random = Math.floor(Math.random() * 25 + 1);
      return `https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${random}.jpeg`;
    } else if (backgroundImage) {
      return backgroundImage;
    } else {
      return null;
    }
 };

 return (
        <div className="card-item" style={{ '--is-flipped': isCardFlipped }}>
            <div className="card-item__side -front">
                {/* card-item__focus and card-item__cover code */}
                <div className="card-item__wrapper">
                    {/* card-item__top, card-item__number, card-item__content, and card-item__date code */}
                </div>
            </div>
            <div className="card-item__side -back">
                {/* card-item__cover, card-item__band, card-item__cvv, and card-item__type code */}
            </div>
        </div>
 );
};

export default Card;