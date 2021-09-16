import './App.css';
import Movie from './Component/Movies';
import React , {useState, useEffect} from 'react';
import Pagination from '@material-ui/lab/Pagination';


const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
  
 
function App() {
  const [movies,setMovies]=useState([]);
  const [searchTerm, setSearchTerm]=useState('');
  const [page,setPage]=useState(1);
  const [entertainment,setEntertainment]=useState('movie');
  //const [selectValue,setSelectValue]=useState();

  const FEATURED_API =
    `https://api.themoviedb.org/3/discover/${entertainment}?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
  console.log(FEATURED_API);

  useEffect(()=>{
    getMovies(FEATURED_API);

  },[FEATURED_API])

  const getMovies=(API)=>{
    fetch(API)
    .then(res=>res.json())
    .then(data=>{
      console.log(data.results);
      setMovies(data.results);
    })
  }
  
  const handleOnSubmit=(e)=>{
    e.preventDefault();
      if(searchTerm){  
        getMovies(SEARCH_API+searchTerm);
        console.log(SEARCH_API+searchTerm);
        setSearchTerm('');
      }
  };

  const handleChange=(e)=>{
     setSearchTerm(e.target.value);
  };

  // const handleAction=()=>{
  //   console.log(movies);
  // }

  function handlePage(event,value){
     //console.log(event.target.textContext);
     setPage(value);
     console.log(page,value);
  }

  function handleTv(){
     setEntertainment('tv');
  }

  function handleMovie(){
    setEntertainment('movie');
  }

  // function handleSort(e){
  //   console.log(e.target.value);
  //    setSelectValue(e.target.value);
  //    console.log(selectValue);
  //    let movie=movies;
  //    movie.sort(function(a,b){
  //    return parseFloat(a.selectValue)-parseFloat(b.selectValue);
  //  })
  //  setMovies([...movie]);
  //  console.log(movies);
  // }

  return (
      <>
      <header>
        <div className="btn">
        <button onClick={handleTv}>TV</button>
        <button onClick={handleMovie}>Movie</button>
        {/* <select 
        value={selectValue} 
        onChange={handleSort} 
      >
       <option value="">Sort_By</option>
        <option value="vote_average">Rating</option>
        <option value="C">Realease_date</option>
      </select> */}
        </div>
        <form onSubmit={handleOnSubmit}>
          <input className="search" type="text" placeholder="search" value={searchTerm} onChange={handleChange}/>
        </form>
      </header>
      <div className="movie-container">
       {
        movies.length>0 && movies.map(movie=>{
         return(
         <Movie key={movie.id} {...movie} entertainment={entertainment}/>
         )
      })
     } 
     </div>
        <div className="page">
           <Pagination count={10} page={page} onChange={handlePage} variant="outlined" shape="rounded" />
        </div>
    </> 
  );
}

export default App;
