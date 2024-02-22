import { Component, createElement } from "react";

import { AliasTagsComponent } from "./components/AliasTagsComponent";
import "./ui/AliasTags.css";

export class AliasTags extends Component {
    render() {
        return <AliasTagsComponent sampleText={this.props.sampleText} masterTagsList={this.props.masterTagsList} delimiter={this.props.delimiter} />;
    }
}
