
import React, { useEffect, useState } from 'react'

const PageInfiniteScroll = () => {
    const  [card,setCard] = useState([])
    const [page,setPage] = useState(1)
    const getData = async ()=>{
        fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`).then((res)=>res.json()).then((response)=>{
            console.log(response)
            setCard(response)
        })

    }
    const handleInfiniteScroll = async()=>{
        // -------- entire height ---------
        console.log(`scrollheight`, document.documentElement.scrollHeight)
        // -------height of view port or inner height
        console.log(window.innerHeight,"innerheight")

        //-------how much i scrolll---------
        console.log(document.documentElement.scrollTop,"scrolltop")
        try{
            if(window.innerHeight+document.documentElement.scrollHeight+1>= document.documentElement.scrollTop) {
                setPage((prev)=>prev+1)
            }

        }catch(err){

        }


    }
    useEffect(()=>{
getData()
    },[page])
    useEffect(()=>{
        window.addEventListener('scroll',handleInfiniteScroll)

    })
  return (
    <div className='container'>
        <div className="row">
        {
            card?.map((item)=>{
                return(
                    <div class="card" style={{"width": "300px","margin":"15px"}}>
                        <h1>{item.id}</h1>

  <div class="card-body">
    <h5 class="card-title">{item.title}</h5>
    <p class="card-text">{item.body}.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
                )
            })
        }
      </div>
    </div>
  )
}

export default PageInfiniteScroll
