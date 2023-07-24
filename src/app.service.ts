import { Injectable, NotFoundException, Options } from '@nestjs/common';
import {Model} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { Query} from 'express-serve-static-core';
​

@Injectable()
export class AppService { 
    getHello() { 
        console.log('help');
    } 
}