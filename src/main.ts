import { Game } from './core/app.ts'
// import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'

// // Your web app's Firebase configuration (For
// // Firebase JS SDK v7.20.0 and later, measurementId is optional)
// const firebaseConfig: any = {
//   apiKey: 'AIzaSyDqSkPyq2l92R27JFbYyYQmNdYh-UpRcJ4',
//   authDomain: 'vortexx-e89f8.firebaseapp.com',
//   projectId: 'vortexx-e89f8',
//   storageBucket: 'vortexx-e89f8.appspot.com',
//   messagingSenderId: '76885884562',
//   appId: '1:76885884562:web:84ecce2058c3af5094f04b',
//   measurementId: 'G-3JPQNTSWG3',
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

// Get canvas element
let render = document.querySelector('#renderCanvas') as HTMLCanvasElement

// Running the app
let GAME = new Game(render)
GAME.init()
