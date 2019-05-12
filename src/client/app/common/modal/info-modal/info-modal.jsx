import React from "react";
import {modals} from "../modals";


export const infoModal = {
    show: (props) => {
        const modal = modals.openModal({
            content: (
                <InfoModal
                    onClose={value => modal.close(value)}
                    {...props}
                />
            ),
            className: "info-modal"
        });
        return modal.result;
    }
};

export class InfoModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {title, btnText, content, onClose} = this.props;
        return(
            <div className="info-modal">
                <div className="m-header">
                    {title}
                </div>
                <div className="m-body">
                    {content}
                </div>
                <div className="m-footer">
                    <button className="btn btn-lg"
                            onClick={onClose}
                    >
                        {btnText}
                    </button>
                </div>
            </div>
        );
    }
}

