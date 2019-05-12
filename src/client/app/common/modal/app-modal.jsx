import {modals} from "./modals";
import React from "react";

export const appModal =(Com)=>{
    return {
        show : (className)=>{
            const modal = modals.openModal({
                content: (
                    React.cloneElement(
                        Com,
                        {close:value => modal.close(value)}
                    )
                ),
                className
            });

            return modal.result;
        }
    };
};