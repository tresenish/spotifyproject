import React, {useState} from 'react';
import './Searchbar.css';
function Searchbar(){
    const [userInput, setUserInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const handleChange = ({target}) => {
        setUserInput(target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        alert(`Бедолага: ${userInput}`);

    }
    return (
        <>
            <form className={`formInput ${submitted ? 'formSubmitted' : ''}`} onSubmit={handleSubmit}>
                <input 
                    className='formInput'
                    id='search'
                    name='search'
                    type='text'
                    onChange={handleChange}
                    value={userInput}
                    placeholder="What do you want to play?"
                />
                <button className='formInput' type='submit'><span class="material-symbols-outlined">search</span></button>
            </form>
            
        </>
    );
}
export default Searchbar;