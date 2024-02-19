import { Component, createElement } from "react";

export class AliasTagsComponent extends Component {
    render() {
        return buildTags(this.props.sampleText);
    }
}

function buildTags(tagsText) {
    console.error("tagsText:", tagsText);
    const tagsArray = tagsText.split(' ');
    console.error("tagsArray:", tagsArray);
    var tagsHTML = [];
    var i = 0;
    // for (currentTag in tagsArray) {
    //     console.log("currentTag:", currentTag);
    //     i++;
    //     tagsHTML.push(<button key={"tag-" + i} className="alias-tag">{currentTag}</button>)
    // }
    // return <div className="widget-alias-tags">{tagsHTML}</div>
    return (
        <div className="widget-alias-tags">{
            tagsArray.map(tag => {
                return <button className="alias-tag">
                    {tag}
                </button>
            })
        }</div>
    )
    // return <div className="widget-alias-tags"><button className="alias-tag">Tag 1</button><button className="alias-tag">Tag 2</button><button className="alias-tag">Tag 3</button></div>;
}
