import React , {useEffect , useState} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

import Receipe from  './components/Recipe';
import Header from  './components/header';
import Footer from  './components/footer';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function App() {

  const APP_ID = '91db4fcb';
  const APP_KEY = 'a490acb470ab8b5e2e28793eea371c8d'; 
  const [counter , setCounter] = useState(0);
  const [receipes , setReceipe] = useState([]);
  const [search , setSearch] = useState('');
  const [query , setQuery] = useState('banana'); 

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
      setOpen(true);
      return false;
    }
    setQuery(search);
    setSearch('');
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="App">
    <Header />
      <h1>Hello React</h1>
      <form className="recipeForm" onSubmit = {handleSubmit}>
      <input type="text" className="serachBar" value={search} onChange={handleChange}>
      </input>
      <button className="serachButton"> Search </button>

    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} >
    <Alert onClose={handleClose} severity="error">
        Please enter recipe name !
    </Alert>
  </Snackbar>
    
      </form>
      <div className="receipeList">
      { receipes.map(recipe => 
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
