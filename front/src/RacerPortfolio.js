// import React, {useState, useEffect} from 'react';

// import axios from 'axios';
// import styled from 'styled-components';
// import {useDispatch, useSelect} from "react-redux";

// function RacerPortfolio(){

//     const [racer, setRacer] = useState(null);
    
//     useEffect(() => {
//         console.log(racer);
//     }, [racer]);
    
//     const fetchData = async () => {
//         let response = await axios.post("http://127.0.0.1:5000/elicer");
//         setRacer(response.data);
//     };
    
//     useEffect(() => {
//         fetchData();
//     }, []);
    
//     useEffect(() => {
//     const timer = setInterval(() => {
//         fetchData();
//         console.log("갱신 완료.");
//     }, 5000);

//     return () => {
//         clearInterval(timer);
//     };
// }, []);

// return (
//     <>
//     <h1>엘리서 네트워크</h1>
//     {racer === null ? (
//       <p>Loading...</p>
      
//     ) : (
//       <>
//         <CovidInfo
//           area={selectArea.area}
//           date={covidData.updated_data}
//           todayNum={selectArea.todayNum}
//           level={selectArea.level}
//         />
//         <CovidView
//           covidData={covidData.data}
//           onAreaClick={handlerAreaSelect}
//         />
//       </>
//     )}
//   </StyleMap>
// );
// }
// export default CovidMap;