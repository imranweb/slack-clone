import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import App from './App';
import ChatView from '../src/containers/chat-view';
import Drawer from '../src/drawer';

Enzyme.configure({
  adapter: new Adapter(),
});

const props = {
  userId: 'Imran',
};

beforeEach(function() {});

describe('<App />', () => {
  it('should render 2 Lists inside <Board /> component', () => {
    const boardComponent = shallow(<ChatView {...props} />);
    expect(boardComponent.find(Drawer)).to.have.lengthOf(1);
  });
})