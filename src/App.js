import React , {useEffect , useState} from 'react';
import './App.css';
import Receipe from  './components/Recipe';
import Header from  './components/header';
import Footer from  './components/footer';


function App() {

  const APP_ID = '91db4fcb';
  const APP_KEY = 'a490acb470ab8b5e2e28793eea371c8d'; 
  const [counter , setCounter] = useState(0);
  const [receipes , setReceipe] = useState([]);
  const [search , setSearch] = useState('');
  const [query , setQuery] = useState('banana'); 

  // if there is an change in state the useEffect will run or pass an empty array in second params of useeffect to run once on load the component.

  useEffect(() => {
    getRecipe();
    console.log('Use effect has been run');
  },[query]);

  const getRecipe = async () => {
    const response  = await fetch(`http://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setReceipe(data.hits);
  } 

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(!search) {
      alert('Please enter recipe name..');
      return false;
    }
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
    <Header />
      <h1>Hello React</h1>
      <form className="recipeForm" onSubmit = {handleSubmit}>
      <input type="text" className="serachBar" value={search} onChange={handleChange}>
      </input>
      <button className="serachButton"> Search </button>       
      </form>
      <div className="receipeList">
      {receipes.map(recipe => 
          <Receipe 
          key = {recipe.recipe.label}
          title = {recipe.recipe.label}
          calories = {recipe.recipe.calories}
          image = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
          />
        )}
       </div>  
       <Footer />    
    </div>
  );
}

export default App;
