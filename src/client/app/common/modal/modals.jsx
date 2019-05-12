import React from "react";
import {Modal} from "./modal";
import {TransitionGroup} from "react-transition-group";
import {Fade} from "../animation/fade";
import _ from "lodash";



export class ModalsRegistry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalList: []
        };

        modals.openModal = (options) => {
            let modalOptions = {
                options,
                resolve: null
            };

            let {modalList}=this.state;
            this.setState({
                modalList:modalList.concat([modalOptions])
            });
            let result = new Promise((resolve) => {
                modalOptions.resolve = resolve;
            });
            return {
                dismiss: () => {
                    this.dismiss(modalOptions);
                },
                close: (result) => {
                    this.close(modalOptions, result);
                },
                result: result
            };
        };
    }

    dismiss(modal) {
        _.remove(this.state.modalList, modal);
        modal.resolve();
        this.forceUpdate();
    }

    close(modal, result) {
        _.remove(this.state.modalList, modal);
        modal.resolve(result);
        this.forceUpdate();
    }

    render() {
        const {modalList} = this.state;


        return (
            <TransitionGroup className="modal-list">
                {modalList.map((modal, i) => (
                    <Fade
                        key={i}
                        timeout={300}
                        className="modal-f"

                    >
                        <Modal isStack={modalList.length > 1}
                               className={modal.options.className}
                               content={modal.options.content}
                               onDismiss={() => this.dismiss(modal)}
                        />
                    </Fade>

                ))}
            </TransitionGroup>
        );
    }
}

export const modals = {};

