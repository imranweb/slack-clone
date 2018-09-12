import React from 'react';
import raf from '../temp-polyfill';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import ChatView from '../containers/chat-view';
import Drawer from '../drawer';
import configureStore from 'redux-mock-store'

Enzyme.configure({
  adapter: new Adapter(),
});

// create any initial state needed
const initialState = {
}; 
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
let wrapper;
let store;

describe("<ChatView />", function() {
  beforeEach(() => {
    //creates the store with any initial state or middleware needed  
    store = mockStore(initialState)
    wrapper = shallow(<ChatView store={store} currentUserId="Imran" />).dive();
   })

  it('should render <ChatView /> with 1 Drawer component', function() {
    expect(wrapper.find(Drawer)).to.have.lengthOf(1);
  });
});