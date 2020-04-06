import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DoteEnv from 'dotenv';

DoteEnv.config({ path: '.env.test' });

Enzyme.configure({
    adapter: new Adapter()
})