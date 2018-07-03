import React , {Component} from 'react'
import PropTypes from 'prop-types'
import {ButtonBackToHome} from '../components/ButtonBackToHome'
import axios from 'axios';

var reqCancelRequest = axios.CancelToken.source();
const API_KEY = '5e3a14e4'

export default class Detail extends Component{
  static propTypes = {
    match:PropTypes.shape({
      params:PropTypes.object,
      isExact:PropTypes.bool,
      path:PropTypes.string,
      url:PropTypes.string
    })
  }

  state = {
    movie : {},
    movieExist:false,
    isLoading:true,
    progressBar:15,
    intervalProgressBar: () => {}
  }

  _fetchMovie({id}){
    /*
    let intervalBar = setInterval(() => {
      this.setState({progressBar:this.state.progressBar+10})
     }, 1000); 
    this.setState({intervalProgressBar:intervalBar})
    setTimeout(() => {
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then(res => res.json())
      .then(movie => {
        console.log({movie})
        //const {imdbID} = movie
        //console.log(movie.imdbID)
        if(movie.imdbID){
          this.setState({movie,movieExist:true})
        }
        this.setState({isLoading:false})
      })
      .catch(function(error) {
        console.log(error);
        this.setState({movieExist:false,isLoading:false})
      })
    }, 5000);*/

    axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`, {
      cancelToken: reqCancelRequest.token
    })
    .then(response => {
      console.log(response)
      //const {imdbID} = movie
      //console.log(movie.imdbID)
      if(response.data.imdbID){
        this.setState({movie:response.data,movieExist:true})
      }
      this.setState({isLoading:false})
    })
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // handle error
        console.log(thrown)
        this.setState({movieExist:false,isLoading:false})
      }
      
    });
  }

  componentDidMount(){
    console.log('componentDidMount')
    reqCancelRequest = axios.CancelToken.source();
    console.log(this.props)
    const {id} = this.props.match.params
    this._fetchMovie({id})
  }

  componentWillUnmount(){
    console.log('componentWillUnmount')
    //clearInterval(this.state.intervalProgressBar)
    // cancel the request (the message parameter is optional)
    reqCancelRequest.cancel('Operation canceled by the user.');
    reqCancelRequest = null
  }

  componentDidCatch (error, errorInfo) {
    console.log('componentDidCatch')
    console.log({ error, errorInfo })
  }

  render(){
    const {Title, Poster, Actors, Metascore, Plot} =
    this.state.movie

    if(this.state.isLoading){
      return <progress className="progress is-primary" value={this.state.progressBar} max="100">30%</progress>
    }

    return(
      <div>
          <ButtonBackToHome />
          {this.state.movieExist
           ? <div>
             <h1>{Title}</h1>
             <img
              src = {Poster}
              alt = {Title}
             />
             <h3>{Actors}</h3>
             <span>{Metascore}</span>
             <p>{Plot}</p>
             </div>
           : <span className='button is-info'>No se ha encontrado el detalle de la pelicula..</span>
           }
          
      </div>
    )
  }
}
