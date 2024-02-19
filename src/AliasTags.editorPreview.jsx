import { Component, createElement } from "react";
import { AliasTagsComponent } from "./components/AliasTagsComponent";

export class preview extends Component {
    render() {
        return <AliasTagsComponent sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss() {
    return require("./ui/AliasTags.css");
}
