import React from "react";

export class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        document.body.style.overflowY = "hidden";
    };

    componentWillUnmount() {
        setTimeout(()=> {
            document.body.style.overflowY = null;
        }, 300);
    }


    render() {
        const {className, onDismiss, content} = this.props;

        return (
            <div className={className}>
                <div className="my-modal">
                    <div
                        className="modal-overlay"
                        onMouseDown={(e) => e.target === this.overlayElem && onDismiss()}
                        ref={(elem) => this.overlayElem = elem}
                    >
                        <div className="modal-box">


                            { content }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}