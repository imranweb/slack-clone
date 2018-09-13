import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
// import raf from '../temp-polyfill';
import ChatView from '../containers/chat-view';
import Drawer from '../drawer';

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

describe('<ChatView />', () => {
  beforeEach(() => {
    // creates the store with any initial state or middleware needed
    store = mockStore(initialState);
    wrapper = shallow(<ChatView store={store} currentUserId="Imran" />).dive();
  });

  it('should render <ChatView /> with 1 Drawer component', () => {
    expect(wrapper.find(Drawer)).to.have.lengthOf(1);
  });
});
