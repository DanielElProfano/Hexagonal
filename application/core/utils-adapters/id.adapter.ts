import {v4 as uuidv4} from 'uuid';
import { idInterface } from '../Infrastruture/adapters/id.interface';

export class createIdAdapter implements idInterface {
    async createId (): Promise<string>{
        const id =  await uuidv4()
        return id;
    }

}