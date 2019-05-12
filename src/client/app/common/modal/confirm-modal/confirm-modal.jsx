import React from "react";
import {modals} from "../modals";

export const confirmModal = {
    show: (props) => {
        const modal = modals.openModal({
            content: (
                <ConfirmModal
                    onClose={value => modal.close(value)}
                    {...props}
                />
            ),
            className: "confirm-modal"
        });
        return modal.result;
    }
};

export class ConfirmModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {content, confirmText, rejectText, onClose} = this.props;
        return(
            <div className="confirm-modal">
                <div className="m-header">
                    Xác nhận
                </div>
                <div className="m-body">
                    {content}
                </div>
                <div className="m-footer row">
                    <div className="btn-confirm col-6 p-0">
                        <button className="btn btn-lg"
                                onClick={() => onClose(true)}
                        >
                            {confirmText}
                        </button>
                    </div>
                    <div className="btn-reject col-6 p-0">
                        <button className="btn btn-lg"
                                onClick={() => onClose(false)}
                        >
                            {rejectText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}