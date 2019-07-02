import React, { Component } from 'react'
import api from './Api'

const statuses = {
    'watched':'Assistido',
    'watching':'Assistindo',
    'toWatch':'Assistir'
}
    
class NewSeries extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false
        }
        this.saveSeries = this.saveSeries.bind(this)
    }

    componentDidMount() {
        this.setState({isLoading:true})
        api.loadGenres()
        .then((res)=>{
          this.setState({
            isLoading:false,
            genres:res.data
            })
        })
    }
    saveSeries() {
        const newSeries = {
            name: this.refs.name.value, 
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }

        api.saveSeries(newSeries).then((res)=>console.log(res))

        console.log(newSeries)
    }
    render() {        
        return (
            <section className='intro-section'>
                <h1>Nova série</h1>
                <form>
                    Nome: <input type='text' ref='name' className='form-control'/><br/>
                    Status: 
                    <select ref='status'>
                        { Object
                        .keys(statuses)
                        .map(key => <option key={key} value={key}>{statuses[key]}</option>)}
                    </select><br/>
                    Gênero: 
                    <select  ref='genre'>
                        { this.state.genres
                            .map(key => <option key={key} value={key}>{key}</option>)
                        }
                    </select><br/>
                    Comentários: <textarea ref='comments' className='form-control'></textarea><br/>
                    <button type='button' onClick={this.saveSeries}>Salvar</button>
                </form>
            </section>        
        )        
    }
}

export default NewSeries