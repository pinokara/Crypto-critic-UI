import React from "react";

export class ModalForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        const {message,content , onClose , onSave ,title,okText, target} =this.props;
        return(
            <div className="modal fade" id={target && target} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    onClick={()=> onClose && onClose()}
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {message && message}
                            {
                                content && content()
                            }
                        </div>
                        <div className="modal-footer">
                              {
                                  onClose && (
                                    <button
                                      type="button"
                                      className="btn btn-secondary btn-close-modal"
                                      data-dismiss="modal"
                                      onClick={()=> onClose && onClose()}
                                    >Close</button>
                                  )
                              }
                            {
                                onSave && (
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    onClick={()=> {
                                      onSave && onSave()
                                    }}
                                  >{okText? okText : "Save changes"}</button>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}