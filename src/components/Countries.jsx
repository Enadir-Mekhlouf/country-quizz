import { useEffect, useState } from 'react';
import './countries.css';
import CheckIcon from "../assets/Check_round_fill.svg";
import CloseIcon from "../assets/Close_round_fill.svg";
import Congrats from "../assets/congrats.svg";



function CountryCard({ CountryQuiz }) {
    const [checkanswer, setCheckAnswer] = useState(null);
    const [pagequiz, setPageQuiz] = useState(0);
    const [activeButton, setActiveButton] = useState(1);
    const [activequestion, setactivequestion] = useState(null);
    const [trueanswer, settrueanswer] = useState(null)
    const [clickedNumbers, setClickedNumbers] = useState([]); // Added
    const [totalclick, settotalclick] = useState(0)
    const [tracker, settracker] = useState(0) // track correct answers 
    const [quizcomplete, setquizcomplete] = useState(false)
    

    const PageNumbers = CountryQuiz.length;

    const renderNumbers = () => {
        const numberElements = [];
        for (let i = 1; i <= PageNumbers; i++) {
            const isClicked = clickedNumbers.includes(i-1);
            numberElements.push(
                <button 
                key={i} 
                className={`number font-face ${activeButton === i || isClicked ? 'number-active' : ''}`} 
                onClick={() => handleNumberClick(i) }  
                disabled={isClicked} // Added
                >
                    {i}
                </button>
            );
        }
        return numberElements;
    };

    const handleNumberClick = (index) => {
        // if (!clickedNumbers.includes(index)) {
        //     setClickedNumbers([...clickedNumbers, index]);
        // }
        
        setCheckAnswer(null);
        setPageQuiz(index - 1);
        setActiveButton(index);
        settrueanswer(null);
        setactivequestion(null);
        
    };

    // const handleButtonClick = (value) => {
    //     if (CountryQuiz[pagequiz].country === value) {
    //         console.log("correct");
    //         setCheckAnswer(true);
            
            
    //     } else {
    //         setCheckAnswer(false);
    //         console.log("false");
    //         for (let i=0; i<CountryQuiz[pagequiz].option.length;i++){
    //             if(CountryQuiz[pagequiz].country == CountryQuiz[pagequiz].option[i]){
    //                 console.log(CountryQuiz[pagequiz].option[i])
    //             }
    //         }
    //     }
    // };

    //todo function show the correct answer if clicked on the false one and disable click on the display-question-grid country buttons
    const handleButtonClick = (value, indexs) => {
        if (CountryQuiz[pagequiz].country === value) {
            //console.log("correct");
            setCheckAnswer(true);
            settracker(tracker=>tracker+ 1 ) // +1 
        } else {
            setCheckAnswer(false);
            //console.log(indexs); //where i clicked
            const correctIndex = CountryQuiz[pagequiz].option.findIndex(option => option === CountryQuiz[pagequiz].country);
            settrueanswer(correctIndex);
        }
        setactivequestion(indexs);
        settotalclick(totalclick=>totalclick + 1)
        // console.log(tracker)
        // console.log(totalclick)
        // console.log(pagequiz)
        // setPageQuiz(pagequiz=>pagequiz+1)
        // console.log(pagequiz)
        //setClickedNumbers([ pagequiz,...clickedNumbers]);
        if (!clickedNumbers.includes(pagequiz)) {
            
            setClickedNumbers([...clickedNumbers,pagequiz]);
            
        }
        
    };

    useEffect(() => {
        if (clickedNumbers.length === 10) {
            console.log('After   '+clickedNumbers.length)
            setTimeout(() => {
                setquizcomplete(true);
                settracker(tracker) 
            }, 1000);
        }
    }, [clickedNumbers,tracker]);
    
    
    

    return (
        <div className="Card-quiz-background font-face">
            {!quizcomplete ?(
                   CountryQuiz.length > 0 ? (
                <div className="Card-quiz-container">
                    <div className="title">Country Quiz</div>
                    <div className="quiz-number">
                        {renderNumbers()}
                    </div>
                    <div className='quiz-question'>
                        <p>what's the flag of this country {CountryQuiz[pagequiz].flag}</p>
                    </div>
                    {/* <div className='display-question-grid'>
                        <button className='country-button' value={CountryQuiz[pagequiz].option[0]} onClick={(e) => handleButtonClick(e.target.value)}>
                            <p>{CountryQuiz[pagequiz].option[0]}</p>
                        </button>
                        <button className='country-button' value={CountryQuiz[pagequiz].option[1]} onClick={(e) => handleButtonClick(e.target.value)}>
                            <p>{CountryQuiz[pagequiz].option[1]}</p>
                        </button>
                        <button className='country-button' value={CountryQuiz[pagequiz].option[2]} onClick={(e) => handleButtonClick(e.target.value)}>
                            <p>{CountryQuiz[pagequiz].option[2]}</p>
                        </button>
                        <button className='country-button' value={CountryQuiz[pagequiz].option[3]} onClick={(e) => handleButtonClick(e.target.value)}>
                            <p>{CountryQuiz[pagequiz].option[3]}</p>
                        </button>
                    </div> */}

                    <div className='display-question-grid font-face'>
                        {CountryQuiz[pagequiz].option.map((option, indexs) => (
                            <button 
                            key={indexs} 
                            className={`country-button ${activequestion === indexs ? 'country-button-active' : ''}`}
                            value={option} onClick={() => handleButtonClick(option, indexs)}
                            disabled={checkanswer !== null}
                            >
                                <div><p className='font-face'>{option}</p>
                                {checkanswer !== null && CountryQuiz[pagequiz].country === option && checkanswer ? <img src={CheckIcon} alt="correct" /> : null}
                                {checkanswer !== null && CountryQuiz[pagequiz].country !== option && !checkanswer && activequestion === indexs ? <img src={CloseIcon} alt="incorrect" /> : null}
                                {trueanswer===indexs ?  <img src={CheckIcon} alt="correct" />: null}
                                </div>
                            </button>
                        ))}
                    </div>

                    

                </div>
            ) : (
                    <p>Loading quiz...</p>
                )
            ):(<div className='Score-Card'>
                <div className='Score-Card-Container'>
                    <div className='Score-Image'><img src={Congrats} alt="" /></div>
                    <div className='Score'>
                        <p className='Score-title'>Congrats! You completed the quiz.</p>
                        <p>You answer {tracker}/10 correctly.</p>
                    </div>
                    <div className=''>
                    <button 
                    className='font-face Score-Card-button country-button country-button-active'
                    onClick={() => window.location.reload()}
                    > Play Again</button></div>
                </div>
            </div>)}
            
        </div>
    );
}
export default CountryCard;
