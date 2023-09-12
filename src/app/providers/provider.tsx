"use client";
 
import React from 'react';
import Provider from './react-redux-provider';
import { store } from '../../redux/app/store';

const Providers = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return <Provider store={store}>{ children }</Provider>
}

export default Providers;