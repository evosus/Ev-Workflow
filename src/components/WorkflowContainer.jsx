import { Component, createElement, } from "react";
import { Tag } from "./Tag";

export class WorkflowContainer extends Component {
    constructor(props) {
        super(props);
        this.delimiter = this.props.delimiter ?? ' ';
        console.debug('delimiter', this.delimiter);
        this.state={
            tagsArray: [],
            masterTagsList: this.props.masterTagsList,
            tagsArrayHasBeenSet: false
        };
    }


    render() {
        const value = this.props.masterTagsList.value;
        console.debug('WorkflowContainer render()', value);
        this.setTagsArray(value);
        return (
            <div className="ev-workflow-container">{
                this.state.tagsArray.map(tag => {
                    return <Tag tag={tag} saveHandler={this.saveHandler.bind(this)}/>
                })
            }</div>
        )
    } 

    setTagsArray(value) {
        console.debug('setTagsArray', value);
        console.debug('this.state.tagsArrayHasBeenSet', this.state.tagsArrayHasBeenSet);
        if (!this.state.tagsArrayHasBeenSet &&  value != undefined) {
            console.debug('this.delimiter', this.delimiter);
            const tagsArray1 = value.split(this.delimiter)
            console.debug('setting tagsArray1', tagsArray1);
            this.setState({
                tagsArray: tagsArray1,
                tagsArrayHasBeenSet: true
            });
        }
    }

    saveHandler() {
        console.debug('saveHandler', this.props);
        console.debug('saveHandler', this.state);
        const value = this.props.masterTagsList.value;
        this.setState({tagsArrayHasBeenSet: false});
        this.setTagsArray(value);
    }
}
