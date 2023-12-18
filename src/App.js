import React, { useState } from 'react';
import CardForm from './components/CardForm';
import i18n from './components/i18n';
import './App.css';

const App = () => {
 const [formData, setFormData] = useState({
   cardName: '',
   cardNumber: '',
   cardMonth: '',
   cardYear: '',
   cardCvv: ''
 });

 const updateCardNumber = (val) => {
   setFormData({ ...formData, cardNumber: val });
 };

 const updateCardName = (val) => {
   setFormData({ ...formData, cardName: val });
 };

 const updateCardMonth = (val) => {
   setFormData({ ...formData, cardMonth: val });
 };

 const updateCardYear = (val) => {
   setFormData({ ...formData, cardYear: val });
 };

 const updateCardCvv = (val) => {
   setFormData({ ...formData, cardCvv: val });
 };

 const changeLanguage = (lng) => {
   i18n.changeLanguage(lng);
 };

 return (
   <div className="wrapper" id="app">
    <CardForm
      formData={formData}
      onInputCardNumber={updateCardNumber}
      onInputCardName={updateCardName}
      onInputCardMonth={updateCardMonth}
      onInputCardYear={updateCardYear}
      onInputCardCvv={updateCardCvv}
    />
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/path/to/image)` }} />
    <button onClick={() => changeLanguage('en')}>English</button>
    <button onClick={() => changeLanguage('fr')}>French</button>
    <h1>{i18n.t('welcome')}</h1>
   </div>
 );
};

export default App;
