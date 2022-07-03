
import React, { Component, useState } from 'react'
import { Button, Menu, Segment } from 'semantic-ui-react'

export default class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: '' }
  
 
  handleItemClick = (e, { name }) => this.setState( {activeItem: name })


  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            name='Info'
            active={activeItem === 'Info'}
            onClick={this.handleItemClick}
                                 
          />
          <Menu.Item
            name='sender'
            active={activeItem === 'sender'}
            onClick={this.handleItemClick}
            
          />
          <Menu.Item
            name='Dispers'
            active={activeItem === 'Dispers'}
            onClick={this.handleItemClick}
            
          />

         
        </Menu>
      </Segment>
    )
  }
}
