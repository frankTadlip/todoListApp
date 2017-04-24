import React from "react";

class Root extends React.Component {
    
    render() {

        console.log(this.props);

        return (
            <section>
               {this.props.children}
            </section>
        );
    }
}

export default Root;