import React, { Component } from "react";


export default class AddCategory extends Component{
    constructor(){
        super()
        this.state = {
            category: ""
        }
    }
    handleAddCategory(event){
        event.preventDefault();
        const category = {
            name: this.state.category
        }
        axios.post('/api/category', category)
        .then(response=>{
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
    handleFieldChange(event){
        this.setState({
            category: event.target.value
        })
    }
    render(){
        return (
            <div className="form">
                <form onSubmit={this.handleAddCategory.bind(this)}>
                    <div className="field">
                        <div className="control">
                            <label className="label">Category</label>
                            <input name="category" className="input" type="text" placeholder="Category" onChange={this.handleFieldChange.bind(this)} />
                            <button type="submit" className="button">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

