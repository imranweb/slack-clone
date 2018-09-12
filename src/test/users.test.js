import React from 'react';
import raf from '../temp-polyfill';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Users from '../containers/users';
import User from '../components/user';
import MockData from '../reducers/sample-data';
import configureStore from 'redux-mock-store'

Enzyme.configure({
  adapter: new Adapter()
});

// create any initial state needed
const initialState = {
  users: MockData.users
}; 
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
let wrapper;
let store;

describe("<Users />", function() {
  beforeEach(() => {
    //creates the store with any initial state or middleware needed  
    store = mockStore(initialState)
    wrapper = shallow(<Users store={store}/>).dive();
   })

  it('should render <Users /> component', function() {
    expect(wrapper.find(User)).to.have.lengthOf(2);
  });
});