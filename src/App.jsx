import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from './components/Countries.jsx'
import './App.css'


function App() {
  const [CountriesDatas, setCountries] = useState([]);
  const [CountriesNamesList, setCountriesNamesList] = useState([]);
  const [randomIndexCountry, setrandomIndexCountry] = useState(null);
  const [CountryQuiz,setCountryQuiz ] = useState([]);


  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
//! country index
  function getCountriesIndex(countryNamesList) {
    // const randomIndex = Math.floor(Math.random() * countryNamesList.length);
    const randomIndexList=[]
    for (let i=0;i<10;i++){
      randomIndexList[i]=Math.floor(Math.random() * countryNamesList.length);
    }
    setrandomIndexCountry(randomIndexList);
  }
 //! country index
  useEffect(()=>{
    getCountriesIndex(CountriesNamesList)
  },[CountriesNamesList]);
  //! add quiz useeffect
  useEffect(() => {
    if (CountriesDatas.length > 0 && randomIndexCountry !== null) {
      getCountryQuiz();
    } else {
      // console.log('Countries data is not available yet');
    }
  }, [CountriesDatas,CountriesNamesList ,randomIndexCountry]);
  //! add quiz 
    function getCountryQuiz() {
      const quiz = randomIndexCountry.map(index => {
      const falseCountryIndices = [];
      for (let i = 0; i < 3; i++) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * CountriesNamesList.length);
        } while (randomIndex === index || falseCountryIndices.includes(randomIndex));
        falseCountryIndices.push(randomIndex);
      }
      const falseCountries = falseCountryIndices.map(falseIndex => CountriesNamesList[falseIndex]);
      // console.log(falseCountries)
      return {
        flag: CountriesDatas[index]?.flag,
        //capital: CountriesDatas[index]?.capital?.[0],
        country: CountriesNamesList[index],
        //option : [CountriesNamesList[index],...falseCountries].sort(() => Math.random() - 0.5),
        option : shuffleArray([CountriesNamesList[index],...falseCountries]),
        falseCountries: falseCountries,
      };
    });
    setCountryQuiz(quiz);
    // console.log(quiz);
  }
  //TODO:

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countriesData = response.data;
        const countryNames = countriesData.map(country => country.name.common);
        setCountries(countriesData);
        setCountriesNamesList(countryNames);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);



  return (
    <>
       <CountryCard CountryQuiz={CountryQuiz}/>
      {/* <div>
        {CountryQuiz.map((countryQuiz, index) => (
          <div key={index}>
            <p>Country: {countryQuiz.country}</p> 
            <p>Capital: {countryQuiz.capital}</p> 
            <p>Flag: {countryQuiz.flag}</p>
            <p>false country: {countryQuiz.falseCountries[0]} or {countryQuiz.falseCountries[1]} or {countryQuiz.falseCountries[2]}</p>
            <br />
          </div>
        ))}
      </div> */}
    </>
  )
}

export default App
