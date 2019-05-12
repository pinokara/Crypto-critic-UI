import React, {Fragment} from "react";
import {InputForm} from "../input-form/input-form";
import {BaseComponent} from "../base-comp";
export class Select extends BaseComponent{
    constructor(props){
        super(props);
        this.state={
            val: this.props.defaultValue || "",
            displayDropDown: false,
            filterKey:"",
            list: this.props.list || []
        };
    };
    // list =[
    //     "conan","songoku","karick","Mana","deni","clakc","clakc","lala","kakarot","manukc","cliet","benma","kiki","lina"
    //
    // ]
    componentWillMount(){
        document.addEventListener('mousedown',this.handleClick,false) ;
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown',this.handleClick,false) ;
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.list ){
            this.setState({
                list : nextProps.list
            })
        }
    }

    handleClick=(e)=>{
        if(this.node.contains(e.target)){
            return ;
        }
        this.setState({
            displayDropDown: false
        })
    }
    handleOnClickItem(index){
        const {list} = this.state
        const {type ,onChange,objs} =this.props ;
        // console.log(objs[index])
        // onChange(objs[index], type) ;

        if(objs){
            onChange( type,objs[index]) ;
        }else{
            onChange(type,list[index])
        }
        this.setState({
            val: list[index],
            displayDropDown : false
        })
    }
    displayDropDownContent=(list,input)=>{
        if(list.length <11){
            var height = list.length*24 ;
        }
        // let {val ,filterKey ,list} =this.state
        return(
            <div
                className="content-wrapper">
                <div>
                    {
                        input&&(
                            <div>
                                <InputForm
                                    placeholder="Search"
                                    type="filterKey"
                                    onChange={(type,val ) => {
                                        this.setState({
                                            [type] : val})
                                    } }
                                />
                                <br/>
                                <br/>
                            </div>

                        )
                    }

                </div>


                <div className="content" style={{height : height }}>
                    {list.map((o,index) =>{
                        return(
                            <div
                                className="item"
                                key={index}
                                onClick={()=> this.handleOnClickItem(index)}
                            >
                                <span>{o}</span>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
    render(){
        const {val,displayDropDown,filterKey,list} =this.state;
        const {label ,input=false,onChange ,type} =this.props
        if(filterKey!="" && list.length > 0){
            var newList= list.filter(o => o.indexOf(filterKey) >-1)
        }
        return(
            <div
                ref={node =>this.node =node}
                className="select-form">
                <Fragment>
                    {label?label:null}
                </Fragment>
                <div
                    className="display"
                    onClick={()=>this.setState({displayDropDown : !this.state.displayDropDown})}>
                    <span>
                        {val}
                    </span>
                    {
                        val !="" && val!= this.props.defaultValue && input &&(
                            <i
                                className="fas fa-times"
                                onClick={(e)=> {
                                    e.preventDefault() ;
                                    e.stopPropagation();
                                    onChange(type,{}) ;
                                    this.setState({
                                        val : this.props.defaultValue,
                                        filterKey: "",
                                    })
                                }}
                            >
                            </i>
                        )
                    }
                    <i className="fas fa-sort-down"></i>
                </div>
                {
                    displayDropDown && this.displayDropDownContent(filterKey==""? list : newList,input)
                }
            </div>
        );
    }
}