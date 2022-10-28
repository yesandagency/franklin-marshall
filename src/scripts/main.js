import Vue from 'vue';
import App from './App';
import header from './components/header';

import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

new Vue( App ).$mount( '#app' );

header();
