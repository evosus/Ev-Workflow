import { Component, createElement } from "react";
import { Tag } from "./Tag";
export class AliasTagsComponent extends Component {
    constructor(props) {
        super(props);
        console.error('props', props);
        const tagsFromAttribute = this.props.masterTagsList;
        console.error('tagsFromAttribute', tagsFromAttribute);
        this.delimiter = this.props.delimiter ?? ' ';
        console.error('delimiter');
        // const tagsArray = props.sampleText.split(this.props.delimiter);
        const tagsArray = props.sampleText.split(' ');
        this.state={
            tagsArray: tagsArray,
            tagsFromAttribute: this.props.masterTagsList
        };
    }

    render() {
        return (
            <div className="widget-alias-tags">{
                this.state.tagsArray.map(tag => {
                    return <Tag tag={tag}/>
                })
            }</div>
        )
    } 

    componentDidMount() {
        console.error('componentDidMount', this.state);
        console.error('this.state.tagsFromAttribute', this.state.tagsFromAttribute);
    }
}
