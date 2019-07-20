import { 
  JOIN,
  PERSONAL,
  WORK,
  SUBMIT,
  GO,
  RESET } from '../types';

import { post, get } from 'axios';

export const reset = data => ({
  type: RESET,
    payload: {
      stage: 0
    }
})

export const join = data => ({
    type: JOIN,
    payload: {
        stage: 1
    }
})

export const addPersonalData = data => ({
    type: PERSONAL,
    payload: {
      stage: 2,
      data
    }
})

export const addWorkData = data => ({
    type: WORK,
    payload: {
      stage: 3,
      data
    }
})

export const submitData = data => {
  post('/api/store', data);
  return {
    type: SUBMIT,
    payload: {
      stage: 0
    }
  }
}

export const goToLunch = data => {
  const groups = get('/api/lunch').groups;
  return {
    type: GO,
    payload: {
      stage: -1,
      groups
    }
  }
}
