import React from "react";
import moment from 'moment';
import EditActivity from './EditActivity.jsx'

class ActivityView extends React.Component{
    constructor(props){
        super(props)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.state = {
            showEdit: false
        }
    }
    
    toggleEdit(){
        this.setState({
            showEdit: !this.state.showEdit
        })
    }

    render(){
        const activity = this.props.activity;
        return(
            <div>
              <p>{moment(activity.start_time, "HH:mm:ss").format("h:mm a")}</p>
              <div>{unescape(activity.description)}</div>
              {/* <button onClick={() => this.showEdit(key)}>edit</button> */}
              <button>upvote</button>
              <button>downvote</button>
              <button onClick={this.toggleEdit} > Edit </button>
                {this.state.showEdit ? <EditActivity
                  activity={activity}
                  toggleEdit={this.toggleEdit}
                  // showEdit={this.showEdit}
                  // key={key}
                  // addActivity={this.addActivity}
                />
                : null }
              <hr />
            </div>

        )
    }
}

export default ActivityView;
