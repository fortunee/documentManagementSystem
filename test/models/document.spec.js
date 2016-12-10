import supertest from 'supertest';
import chai from 'chai';
import db from '../../app/models';
import app from '../../server';
import helper from '../specHelper';


/**
 * Here is a request handler from supertest
 */
const request = supertest.agent(app);

/** Grab the expect method from chai */
const expect = chai.expect;
