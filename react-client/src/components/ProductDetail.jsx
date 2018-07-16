// import React from 'react';

// function ProductDetail(props) {
//   return <div> this is ProductDetail </div>
// }

// export default ProductDetail



import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProductList from './ProductList.jsx'


// The Roster component matches one of two different routes
// depending on the full pathname
const ProductDetail = () => (
  <Switch>
    <Route exact path='/products' component={ProductList}/>
    <Route path='/products/:number' component={Player}/>
  </Switch>
)


const PlayerAPI = {
  players: [
    { number: 1, name: "Ben Blocker", position: "G" },
    { number: 2, name: "Dave Defender", position: "D" },
    { number: 3, name: "Sam Sweeper", position: "D" },
    { number: 4, name: "Matt Midfielder", position: "M" },
    { number: 5, name: "William Winger", position: "M" },
    { number: 6, name: "Fillipe Forward", position: "F" }
  ],
  all: function() { return this.players},
  get: function(id) {
    const isPlayer = p => p.number === id
    return this.players.find(isPlayer)
  }
}



const Player = (props) => {
  debugger;
  const player = PlayerAPI.get(
    parseInt(props.match.params.number, 10)
  )
  if (!player) {
    return <div>Sorry, but the player was not found</div>
  }
  return (
    <div>
      <h1>{player.name} (#{player.number})</h1>
      <h2>Position: {player.position}</h2>
      <Link to='/products'>Back</Link>
    </div>
  )
}



export default ProductDetail


