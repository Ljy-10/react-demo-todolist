import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import './todolist.css'

//定义函数类有两种方法，一种是用箭头函数定义  const 函数名=（参数）=>{函数体}
//另一种形式是 function来定义函数，但会存在this指向问题
const Contains=(list,value)=>{
    for(let i=0;i<list.length;i++)
    {
        if(list[i].title===value)
        {
            return true
        } 
    }
    return false//跳出循环需要在循环外设置
}

const Search = (list,title)=>{
    for(let i = 0;i<list.length ;i++){
        if(list[i].title === title )
        {
            return i
        }
    }
}

class Todolist extends Component {
    constructor(props) {
        super(props)
        this.ref=React.createRef();
        this.state = {
            list: [
                
            ]
        }
    }

    // 下面是几个适合使用 refs 的情况：
    // 1 管理焦点，文本选择或媒体播放。
    // 2 触发强制动画。
    // 3 集成第三方 DOM 库。
    // 通过ref可以获取当前元素节点的具体数值等内容
    // react中ref的用法有多种方式，现在比较常用的是在构造函数中先进行ref值的创建，通过React.createRef()进行创建
    // 对于节点的ref值进行访问时可使用ref的current属性，this.ref.current
    // ref 的值根据节点的类型而有所不同：
    // 1 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
    // 2 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
    // 3 你不能在函数组件上使用 ref 属性，因为他们没有实例。
     
    addData = (e) => {
        const temp = {
            title: this.ref.current.value,
            checked: false
        }
        
        if(Contains(this.state.list,this.ref.current.value)===true){
               
            alert("请重新输入")

        }
        else{
            const list = this.state.list
            list.push(temp)
            this.setState({
            list: list
            })
            
        }
    }
    
    removeData = title => {
        const list = this.state.list
        var index2 = Search(list,title)
        list.splice(index2, 1)
        this.setState({
            list: list
        })
    }
    
    //因为每次添加数组的操作以及将表项设为已完成或删除等操作会改变数组的index值
    //所以需要以title的值为key键，确保每一项的唯一性
    changeChecked = title => {
        const list = this.state.list
        var index1 = Search(list,title)
        list[index1].checked = !list[index1].checked
        this.setState({
            list: list
        })
    }

    render() {
        return (
            <div className="todolist">
                <h3>输入:</h3>
                <div className="row1">
                    <input ref={this.ref}/>
                    <button onClick={this.addData}>Add</button>
                </div>
                <ul>
                    {//filter函数和map函数可以复用，filter函数实现过滤作用，map函数对所有过滤后的内容进行统一操作
                        this.state.list.filter((value) => value.checked === false).map((value)=>{
                            return(
                                <li key={value.title}>
                                    <input type="checkbox" checked={value.checked} onChange={this.changeChecked.bind(this, value.title)}/>
                                    {value.title}
                                    <button onClick={this.removeData.bind(this, value.title)}>Delete</button>
                                </li>
                            )
                        })
                    }   
                    
                </ul>
                <ul>
                    {
                        this.state.list.filter((value) => value.checked === true).map((value)=> {
                            return (
                                <li key={value.title}>
                                    <input type="checkbox" checked={value.checked} onChange={this.changeChecked.bind(this, value.title)}/>
                                    <span className={"through"} >{value.title}</span>
                                    <button onClick={this.removeData.bind(this, value.title)}>Delete</button>
                                </li>
                            )
                        } 
                            
                    )
                    }
                </ul>
            </div>
        )
    }
}

ReactDOM.render(
  <Todolist />,
  document.getElementById('root')
)