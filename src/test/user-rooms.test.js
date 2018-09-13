import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import UserRooms from '../containers/user-rooms';
import Rooms from '../components/rooms';
import MockData from '../reducers/sample-data';

Enzyme.configure({
  adapter: new Adapter(),
});

// create any initial state needed
const initialState = {
  rooms: MockData.rooms,
};
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
let wrapper;
let store;

describe('<Users />', () => {
  beforeEach(() => {
    // creates the store with any initial state or middleware needed
    store = mockStore(initialState);
    wrapper = shallow(<UserRooms store={store}/>).dive();
  });

  it('should render <Users /> component', () => {
    expect(wrapper.find(Rooms)).to.have.lengthOf(1);
  });
});
