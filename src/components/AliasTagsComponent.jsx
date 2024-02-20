import { Component, createElement } from "react";
import { Tag } from "./Tag";
export class AliasTagsComponent extends Component {
    constructor(props) {
        super(props);
        console.error(props);
        const tagsArray = props.sampleText.split(' ');
        this.state={
            tagsArray: tagsArray
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
}
