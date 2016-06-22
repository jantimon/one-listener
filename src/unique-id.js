//import { generate } from 'shortid';
//const uniqueId = generate;
let counter = 0;
const uniqueId = () => `${++counter}`;
export default uniqueId